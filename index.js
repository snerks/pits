#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var spawn = require("cross-spawn");
var process = require("process");
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
var packageNames = [
    'redux',
    'react-redux'
];
var getYarnCommand = function () {
    return 'yarnpkg';
};
var getYarnAddCommandLineArgs = function () {
    var commandParts = [
        'add'
    ].concat(packageNames);
    return commandParts;
};
var getYarnAddTypesCommandLineArgs = function () {
    var packageNameTypes = packageNames.map(function (packageName) {
        return "@types/" + packageName;
    });
    var commandParts = [
        'add'
    ].concat(packageNameTypes, [
        '-D'
    ]);
    return commandParts;
};
var getYarnAddCommandLine = function () {
    var commandParts = [
        getYarnCommand()
    ].concat(getYarnAddCommandLineArgs());
    var command = commandParts.join(' ');
    return "Command : " + command;
};
var getYarnAddTypesCommandLine = function () {
    var commandParts = [
        getYarnCommand()
    ].concat(getYarnAddTypesCommandLineArgs());
    var command = commandParts.join(' ');
    return "Command : " + command;
};
var printMessage = function () {
    console.log('Hello from PITS!');
    console.log("Packages : " + getYarnAddCommandLine());
    console.log("Types : " + getYarnAddTypesCommandLine());
    console.log("CWD : " + process.cwd());
};
printMessage();
var packageInstallCommand = getYarnAddCommandLine();
var packageInstallTypesCommand = getYarnAddTypesCommandLine();
console.log('Installing NPM Packages using ' + packageInstallCommand + '...');
console.log();
var addProc = spawn(getYarnCommand(), getYarnAddCommandLineArgs(), { stdio: 'inherit' });
addProc.on('close', function (code) {
    if (code !== 0) {
        console.error('`' + getYarnCommand() + ' ' + getYarnAddCommandLineArgs().join(' ') + '` failed');
        return;
    }
});
console.log('Installing NPM Types Packages using ' + packageInstallTypesCommand + '...');
console.log();
var addTypesProc = spawn(getYarnCommand(), getYarnAddTypesCommandLineArgs(), { stdio: 'inherit' });
addTypesProc.on('close', function (code) {
    if (code !== 0) {
        console.error('`' + getYarnCommand() + ' ' + getYarnAddTypesCommandLineArgs().join(' ') + '` failed');
        return;
    }
});
