#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var process = require("process");
var commander = require("commander");
var fs = require("fs");
var chalk = require("chalk");
var spawn = require("cross-spawn");
var YarnCommandProvider_1 = require("./YarnCommandProvider");
var NpmCommandProvider_1 = require("./NpmCommandProvider");
var BundleResolver_1 = require("./BundleResolver");
console.log(chalk.cyan('Hello from Package Installer for TypeScript!'));
var isNodeProject = fs.existsSync('package.json');
var useYarn = fs.existsSync('yarn.lock');
function list(itemsText) {
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
var requiredPackageNames = [];
if (commander.bundle) {
    requiredPackageNames = BundleResolver_1.getBundlePackageNames(commander.bundle);
}
else {
    if (commander.list && commander.list.length) {
        requiredPackageNames = commander.list;
    }
}
var haveUserSuppliedArgs = requiredPackageNames.length > 0;
var requiredCommandProvider = (useYarn ? new YarnCommandProvider_1.default(requiredPackageNames) : new NpmCommandProvider_1.default(requiredPackageNames));
var installGroup = function (installMessage, installCommandLine, packageManagerAppName, installPackageCommandArgs) {
    console.log(installMessage + " " + installCommandLine + " ...");
    console.log();
    // tslint:disable-next-line:no-any
    var installProcess = spawn(packageManagerAppName, installPackageCommandArgs, { stdio: 'inherit' });
    installProcess.on('close', function (code) {
        if (code !== 0) {
            console.error('`' + installCommandLine + '` failed' + ' : error Code = ' + code.toString());
            return;
        }
    });
};
var installPackages = function (commandProvider) {
    installGroup('Installing NPM Packages using', commandProvider.installPackageCommandLine, commandProvider.packageManagerAppName, commandProvider.installPackageArgs);
};
var installPackageTypes = function (commandProvider) {
    installGroup('Installing NPM Types Packages using', commandProvider.installPackageTypesCommandLine, commandProvider.packageManagerAppName, commandProvider.installPackageTypesArgs);
};
var haveResolvedPackageNames = (requiredPackageNames && requiredPackageNames.length > 0);
var isRequestSuppressed = !haveResolvedPackageNames || !isNodeProject;
if (isRequestSuppressed) {
    if (!isNodeProject) {
        console.log(chalk.red("This folder does not contain a project.json file."));
    }
    else {
        console.log(chalk.red("Your request resolved to NO ITEMS!"));
    }
}
console.log(chalk.cyan("Your request resolved to the following items:"));
if (haveResolvedPackageNames) {
    for (var _i = 0, requiredPackageNames_1 = requiredPackageNames; _i < requiredPackageNames_1.length; _i++) {
        var requiredPackageName = requiredPackageNames_1[_i];
        console.log(chalk.green("\t" + requiredPackageName));
    }
}
else {
    console.log(chalk.red("Your request resolved to NO ITEMS!"));
}
if (isRequestSuppressed) {
    console.log(chalk.red("No package will be requested."));
}
else {
    installPackages(requiredCommandProvider);
    installPackageTypes(requiredCommandProvider);
}
