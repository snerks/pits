const BUNDLE_REDUX = 'r';
const BUNDLE_REDUX_ASYNC = 'ra';
const BUNDLE_REDUX_ROUTER_ASYNC = 'rra';

const reduxPackageNames: string[] = [
    'redux',
    'react-redux',
];

const reduxThunkPackageNames: string[] = [
    'redux',
    'react-redux',
    'redux-thunk',
    'redux-devtools-extension'
];

const reduxRouterThunkPackageNames: string[] = [
    'redux',
    'react-redux',
    'react-router-dom',
    'redux-thunk',
    'redux-devtools-extension'
];

export const getBundlePackageNames = (bundleShortName: string): string[] => {
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
