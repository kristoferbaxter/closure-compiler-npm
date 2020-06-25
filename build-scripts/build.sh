#!/usr/bin/env bash
# Run the build commands and fail the script if any of them failed
./build-scripts/patch-compiler.js "$@" && ./build-scripts/build-compiler.js "$@" && yarn workspaces run build "$@"
