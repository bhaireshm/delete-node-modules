#!/bin/bash

# Remove dist folder
rm -rf dist/*

# Build project
tsc --build

# Copy files to dist folder
cp ./package.json dist/
cp ./README.md dist/
