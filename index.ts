#!/usr/bin/env node
import * as process from 'process';
import * as commander from 'commander';
import * as fs from 'fs';
import * as chalk from 'chalk';
import spawn = require('cross-spawn');

import { PackageManagerCommandProvider, getTypesPackageNames } from './PackageManagerCommandProvider';
import YarnCommandProvider from './YarnCommandProvider';
import NpmCommandProvider from './NpmCommandProvider';
import { getBundlePackageNames } from './BundleResolver';

console.log(chalk.cyan('Hello from Package Installer for TypeScript!'));

const isNodeProject = fs.existsSync('package.json');
const useYarn = fs.existsSync('yarn.lock');

function list(itemsText: string) {
    return itemsText.split(' ').map(String);
}

// Workaround issue where "index" is displayed as command name
process.argv[1] = 'pits';

commander
    .version('1.0.0')
    .usage('[options] <package ...>')
    .option('-l, --list [packages]', 'List of package items (default: empty list)', list, [])
    .option('-b, --bundle [shortname]', 'A specific bundle of packages (no default)')
    .parse(process.argv);

console.log('You requested:');
console.log('\tPackages - %j', commander.list);
console.log('\tBundle - %s', commander.bundle);

let requiredPackageNames: string[] = [];

if (commander.bundle) {
    requiredPackageNames = getBundlePackageNames(commander.bundle as string);
} else {
    if (commander.list && commander.list.length) {
        requiredPackageNames = commander.list as string[];
    }
}

const haveUserSuppliedArgs = requiredPackageNames.length > 0;

const requiredCommandProvider: PackageManagerCommandProvider = (
    useYarn ? new YarnCommandProvider(requiredPackageNames) : new NpmCommandProvider(requiredPackageNames)
);

const installGroup = (
    installMessage: string,
    installCommandLine: string,
    packageManagerAppName: string,
    installPackageCommandArgs: string[]) => {

    console.log(`${installMessage} ${installCommandLine} ...`);
    console.log();

    // tslint:disable-next-line:no-any
    const installProcess: any = spawn(
        packageManagerAppName,
        installPackageCommandArgs,
        { stdio: 'inherit' }
    );

    installProcess.on('close', (code: number): void => {
        if (code !== 0) {
            console.error(
                '`' + installCommandLine + '` failed' + ' : error Code = ' + code.toString()
            );
            return;
        }
    });
};

const installPackages = (commandProvider: PackageManagerCommandProvider) => {
    installGroup(
        'Installing NPM Packages using',
        commandProvider.installPackageCommandLine,
        commandProvider.packageManagerAppName,
        commandProvider.installPackageArgs
    );
};

const installPackageTypes = (commandProvider: PackageManagerCommandProvider) => {
    installGroup(
        'Installing NPM Types Packages using',
        commandProvider.installPackageTypesCommandLine,
        commandProvider.packageManagerAppName,
        commandProvider.installPackageTypesArgs
    );
};

const haveResolvedPackageNames = (requiredPackageNames && requiredPackageNames.length > 0);
const isRequestSuppressed = !haveResolvedPackageNames || !isNodeProject;

if (isRequestSuppressed) {
    if (!isNodeProject) {
        console.log(chalk.red(`This folder does not contain a project.json file.`));
    } else {
        console.log(chalk.red(`Your request resolved to NO ITEMS!`));
    }
}

console.log(chalk.cyan(`Your request resolved to the following items:`));

if (haveResolvedPackageNames) {
    for (let requiredPackageName of requiredPackageNames) {
        console.log(chalk.green(`\t${requiredPackageName}`));
    }
} else {
    console.log(chalk.red(`Your request resolved to NO ITEMS!`));
}

if (isRequestSuppressed) {
    console.log(chalk.red(`No package will be requested.`));
} else {
    installPackages(requiredCommandProvider);
    installPackageTypes(requiredCommandProvider);
}
