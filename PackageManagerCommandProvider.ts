export const getTypesPackageNames = (packageNames: string[]) => {
    return packageNames.map((packageName: string) => {
        return `@types/${packageName}`;
    });
};

export interface PackageManagerCommandProvider {
    readonly packageManagerAppName: string;

    readonly installPackageArgs: string[];
    readonly installPackageTypesArgs: string[];

    readonly installPackageCommandLine: string;
    readonly installPackageTypesCommandLine: string;
}
