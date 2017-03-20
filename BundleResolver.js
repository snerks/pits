"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BUNDLE_REDUX = 'r';
var BUNDLE_REDUX_ASYNC = 'ra';
var BUNDLE_REDUX_ROUTER_ASYNC = 'rra';
var reduxPackageNames = [
    'redux',
    'react-redux',
];
var reduxThunkPackageNames = [
    'redux',
    'react-redux',
    'redux-thunk',
    'redux-devtools-extension'
];
var reduxRouterThunkPackageNames = [
    'redux',
    'react-redux',
    'react-router-dom',
    'redux-thunk',
    'redux-devtools-extension'
];
exports.getBundlePackageNames = function (bundleShortName) {
    switch (bundleShortName) {
        case BUNDLE_REDUX:
            return reduxPackageNames;
        case BUNDLE_REDUX_ASYNC:
            return reduxThunkPackageNames;
        case BUNDLE_REDUX_ROUTER_ASYNC:
            return reduxRouterThunkPackageNames;
        default:
            return [];
    }
};
