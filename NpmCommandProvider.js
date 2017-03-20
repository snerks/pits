"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PackageManagerCommandProvider_1 = require("./PackageManagerCommandProvider");
var NpmCommandProvider = (function () {
    function NpmCommandProvider(requiredPackageNames) {
        this.requiredPackageNames = requiredPackageNames;
        this.packageManagerAppName = 'npm';
        this.installArgName = 'install';
        this.saveSwitchName = '--save';
        this.saveDevSwitchName = '--save-dev';
    }
    Object.defineProperty(NpmCommandProvider.prototype, "installPackageArgs", {
        get: function () {
            var commandArgs = [
                this.installArgName
            ].concat(this.requiredPackageNames, [
                this.saveSwitchName
            ]);
            return commandArgs;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(NpmCommandProvider.prototype, "installPackageTypesArgs", {
        get: function () {
            var typesPackageNames = PackageManagerCommandProvider_1.getTypesPackageNames(this.requiredPackageNames);
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
    Object.defineProperty(NpmCommandProvider.prototype, "installPackageCommandLine", {
        get: function () {
            var commandParts = [
                this.packageManagerAppName
            ].concat(this.installPackageArgs);
            return commandParts.join(' ');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NpmCommandProvider.prototype, "installPackageTypesCommandLine", {
        get: function () {
            var commandParts = [
                this.packageManagerAppName
            ].concat(this.installPackageTypesArgs);
            return commandParts.join(' ');
        },
        enumerable: true,
        configurable: true
    });
    return NpmCommandProvider;
}());
exports.default = NpmCommandProvider;
