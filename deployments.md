# Deploying Closure Compiler to NPM

*You now need yarn installed: https://yarnpkg.com/en/docs/install*

## Deploying new releases of the main compiler

Run `node_modules/.bin/lerna version --force-publish='*'`.

## Deploying changes to the package CLIs or plugins

Features and fixes to the packages in this repo need not wait for a main compiler release.
They can be published at any time if they are backwards compatible with the last major version.
Breaking changes should be deployed at the same time as a major compiler release.

 1. Run `yarn install`.
 2. Run `node_modules/.bin/lerna version`.
    The command will ask you to choose a new version number.
    Patch level versions should be used for fixing issues.
    Minor level versions should be used for new features that are backwards compatible.
