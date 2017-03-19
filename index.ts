#!/usr/bin/env node
import spawn = require('cross-spawn');
import * as process from 'process';

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

const packageNames: string[] = [
    'redux',
    'react-redux'
];

const getYarnCommand: () => string = () => {
    return 'yarnpkg';
};

const getYarnAddCommandLineArgs: () => string[] = () => {
    const commandParts: string[] = [
        'add',
        ...packageNames
    ];

    return commandParts;
};

const getYarnAddTypesCommandLineArgs: () => string[] = () => {
    const packageNameTypes: string[] = packageNames.map((packageName: string) => {
        return `@types/${packageName}`;
    });

    const commandParts: string[] = [
        'add',
        ...packageNameTypes,
        '-D'
    ];

    return commandParts;
};

const getYarnAddCommandLine: () => string = () => {
    const commandParts: string[] = [
        getYarnCommand(),
        ...getYarnAddCommandLineArgs()
    ];

    const command: string = commandParts.join(' ');

    return `Command : ${command}`;
};

const getYarnAddTypesCommandLine: () => string = () => {
    const commandParts: string[] = [
        getYarnCommand(),
        ...getYarnAddTypesCommandLineArgs()
    ];

    const command: string = commandParts.join(' ');

    return `Command : ${command}`;
};

const printMessage: () => void = () => {
    console.log('Hello from PITS!');
    console.log(`Packages : ${getYarnAddCommandLine()}`);
    console.log(`Types : ${getYarnAddTypesCommandLine()}`);
    console.log(`CWD : ${process.cwd()}`);
};

printMessage();

const packageInstallCommand: string = getYarnAddCommandLine();

console.log('Installing NPM Packages using ' + packageInstallCommand + '...');
console.log();

var addProc: any = spawn(getYarnCommand(), getYarnAddCommandLineArgs(), { stdio: 'inherit' });

addProc.on('close', function (code: number): void {
    if (code !== 0) {
        console.error('`' + getYarnCommand() + ' ' + getYarnAddCommandLineArgs().join(' ') + '` failed');
        return;
    }
});

const packageInstallTypesCommand: string = getYarnAddTypesCommandLine();

console.log('Installing NPM Types Packages using ' + packageInstallTypesCommand + '...');
console.log();

var addTypesProc: any = spawn(getYarnCommand(), getYarnAddTypesCommandLineArgs(), { stdio: 'inherit' });

addTypesProc.on('close', function (code: number): void {
    if (code !== 0) {
        console.error('`' + getYarnCommand() + ' ' + getYarnAddTypesCommandLineArgs().join(' ') + '` failed');
        return;
    }
});
