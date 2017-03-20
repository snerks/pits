
import { PackageManagerCommandProvider, getTypesPackageNames } from './PackageManagerCommandProvider';

class NpmCommandProvider implements PackageManagerCommandProvider {

    readonly packageManagerAppName = 'npm';
    readonly installArgName = 'install';

    readonly saveSwitchName = '--save';
    readonly saveDevSwitchName = '--save-dev';

    constructor(readonly requiredPackageNames: string[]) {

    }

    get installPackageArgs(): string[] {
        const commandArgs: string[] = [
            this.installArgName,
            ...this.requiredPackageNames,
            this.saveSwitchName
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

export default NpmCommandProvider;
