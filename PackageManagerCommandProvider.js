"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTypesPackageNames = function (packageNames) {
    return packageNames.map(function (packageName) {
        return "@types/" + packageName;
    });
};
