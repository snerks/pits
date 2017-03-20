
import { PackageManagerCommandProvider, getTypesPackageNames } from './PackageManagerCommandProvider';

class YarnCommandProvider implements PackageManagerCommandProvider {

    readonly packageManagerAppName = 'yarnpkg';
    readonly installArgName = 'add';
    readonly saveDevSwitchName = '-D';

    constructor(readonly requiredPackageNames: string[]) {

    }

    get installPackageArgs(): string[] {
        const commandArgs: string[] = [
            this.installArgName,
            ...this.requiredPackageNames
        ];

        return commandArgs;
    };

    get installPackageTypesArgs(): string[] {
        const typesPackageNames: string[] = getTypesPackageNames(this.requiredPackageNames);

        const commandArgs: string[] = [
            this.installArgName,
            ...typesPackageNames,
            this.saveDevSwitchName
        ];

        return commandArgs;
    };

    get installPackageCommandLine(): string {
        const commandParts: string[] = [
            this.packageManagerAppName,
            ...this.installPackageArgs
        ];

        return commandParts.join(' ');
    }

    get installPackageTypesCommandLine(): string {
        const commandParts: string[] = [
            this.packageManagerAppName,
            ...this.installPackageTypesArgs
        ];

        return commandParts.join(' ');
    }
}

export default YarnCommandProvider;
