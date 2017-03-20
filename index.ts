#!/usr/bin/env node
import spawn = require('cross-spawn');
// import * as process from 'process';

// var command;
// var args;

// if (useYarn) {
//     command = 'yarnpkg';
//     args = ['add'];
// } else {
//     command = 'npm';
//     args = [
//         'install',
//         '--save',
//         verbose && '--verbose'
//     ].filter(function (e) { return e; });
// }
// args.push('react', 'react-dom', '@types/node', '@types/react', '@types/react-dom', '@types/jest');

const requiredPackageNames: string[] = [
    'redux',
    'react-redux'
];

const getTypesPackageNames: (packageNames: string[]) => string[] = (packageNames: string[]) => {
    return packageNames.map((packageName: string) => {
        return `@types/${packageName}`;
    });
};

interface PackageManagerCommandProvider {
    readonly packageManagerAppName: string;

    readonly installPackageArgs: string[];
    readonly installPackageTypesArgs: string[];

    readonly installPackageCommandLine: string;
    readonly installPackageTypesCommandLine: string;
}

class YarnCommandProvider implements PackageManagerCommandProvider {

    readonly packageManagerAppName = 'yarnpkg';
    readonly installArgName = 'add';
    readonly saveDevSwitchName = '-D';

    get installPackageArgs(): string[] {
        const commandArgs: string[] = [
            this.installArgName,
            ...requiredPackageNames
        ];

        return commandArgs;
    };

    get installPackageTypesArgs(): string[] {
        const typesPackageNames: string[] = getTypesPackageNames(requiredPackageNames);

        const commandArgs: string[] = [
            this.installArgName,
            ...typesPackageNames,
            this.saveDevSwitchName
        ];

        return commandArgs;
    };

    get installPackageCommandLine(): string {
        const commandParts: string[] = [
            this.packageManagerAppName,
            ...this.installPackageArgs
        ];

        return commandParts.join(' ');
    }

    get installPackageTypesCommandLine(): string {
        const commandParts: string[] = [
            this.packageManagerAppName,
            ...this.installPackageTypesArgs
        ];

        return commandParts.join(' ');
    }
}

const requiredCommandProvider: PackageManagerCommandProvider = new YarnCommandProvider();

// type InstallGroupFunction = (
//     installMessage: string,
//     installCommandLine: string,
//     packageManagerAppName: string,
//     installPackageCommandArgs: string[]) => void;

const installGroup = (
    installMessage: string,
    installCommandLine: string,
    packageManagerAppName: string,
    installPackageCommandArgs: string[]) => {

    console.log(`${installMessage} ${installCommandLine} ...`);
    console.log();

    // tslint:disable-next-line:no-any
    var installProcess: any = spawn(
        packageManagerAppName,
        installPackageCommandArgs,
        { stdio: 'inherit' }
    );

    installProcess.on('close', (code: number): void => {
        if (code !== 0) {
            console.error(
                '`' + installCommandLine + '` failed'
            );
            return;
        }
    });
};

// type InstallFunction = (commandProvider: PackageManagerCommandProvider) => void;

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

const printMessage = () => {
    console.log('Hello from PITS!');
};

printMessage();

installPackages(requiredCommandProvider);
installPackageTypes(requiredCommandProvider);
