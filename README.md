## Package Installer for TypeScript

Simple CLI for TypeScript projects.

Attempts to install both the requested `npm` package and the associated `@types` package `d.ts`.

  Usage: pits [options] <package ...>

  Options:

    -h, --help                output usage information
    -V, --version             output the version number
    -l, --list [packages]     List of package items (default: empty list)
    -b, --bundle [shortname]  A specific bundle of packages (no default)

### Uses `yarn`, by default, falling back to `npm`.