#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var spawn = require("cross-spawn");
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
var requiredPackageNames = [
    'redux',
    'react-redux'
];
var getTypesPackageNames = function (packageNames) {
    return packageNames.map(function (packageName) {
        return "@types/" + packageName;
    });
};
var YarnCommandProvider = (function () {
    function YarnCommandProvider() {
        this.packageManagerAppName = 'yarnpkg';
        this.installArgName = 'add';
        this.saveDevSwitchName = '-D';
    }
    Object.defineProperty(YarnCommandProvider.prototype, "installPackageArgs", {
        get: function () {
            var commandArgs = [
                this.installArgName
            ].concat(requiredPackageNames);
            return commandArgs;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(YarnCommandProvider.prototype, "installPackageTypesArgs", {
        get: function () {
            var typesPackageNames = getTypesPackageNames(requiredPackageNames);
            var commandArgs = [
                this.installArgName
            ].concat(typesPackageNames, [
                this.saveDevSwitchName
            ]);
            return commandArgs;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(YarnCommandProvider.prototype, "installPackageCommandLine", {
        get: function () {
            var commandParts = [
                this.packageManagerAppName
            ].concat(this.installPackageArgs);
            return commandParts.join(' ');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(YarnCommandProvider.prototype, "installPackageTypesCommandLine", {
        get: function () {
            var commandParts = [
                this.packageManagerAppName
            ].concat(this.installPackageTypesArgs);
            return commandParts.join(' ');
        },
        enumerable: true,
        configurable: true
    });
    return YarnCommandProvider;
}());
var requiredCommandProvider = new YarnCommandProvider();
// type InstallGroupFunction = (
//     installMessage: string,
//     installCommandLine: string,
//     packageManagerAppName: string,
//     installPackageCommandArgs: string[]) => void;
var installGroup = function (installMessage, installCommandLine, packageManagerAppName, installPackageCommandArgs) {
    console.log(installMessage + " " + installCommandLine + " ...");
    console.log();
    // tslint:disable-next-line:no-any
    var installProcess = spawn(packageManagerAppName, installPackageCommandArgs, { stdio: 'inherit' });
    installProcess.on('close', function (code) {
        if (code !== 0) {
            console.error('`' + installCommandLine + '` failed');
            return;
        }
    });
};
// type InstallFunction = (commandProvider: PackageManagerCommandProvider) => void;
var installPackages = function (commandProvider) {
    installGroup('Installing NPM Packages using', commandProvider.installPackageCommandLine, commandProvider.packageManagerAppName, commandProvider.installPackageArgs);
};
var installPackageTypes = function (commandProvider) {
    installGroup('Installing NPM Types Packages using', commandProvider.installPackageTypesCommandLine, commandProvider.packageManagerAppName, commandProvider.installPackageTypesArgs);
};
var printMessage = function () {
    console.log('Hello from PITS!');
};
printMessage();
installPackages(requiredCommandProvider);
installPackageTypes(requiredCommandProvider);
