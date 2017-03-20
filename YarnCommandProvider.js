"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PackageManagerCommandProvider_1 = require("./PackageManagerCommandProvider");
var YarnCommandProvider = (function () {
    function YarnCommandProvider(requiredPackageNames) {
        this.requiredPackageNames = requiredPackageNames;
        this.packageManagerAppName = 'yarnpkg';
        this.installArgName = 'add';
        this.saveDevSwitchName = '-D';
    }
    Object.defineProperty(YarnCommandProvider.prototype, "installPackageArgs", {
        get: function () {
            var commandArgs = [
                this.installArgName
            ].concat(this.requiredPackageNames);
            return commandArgs;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(YarnCommandProvider.prototype, "installPackageTypesArgs", {
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
exports.default = YarnCommandProvider;
