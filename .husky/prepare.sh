#!/usr/bin/env sh

MODULE_DIR="./node_modules/husky/"
MODULE_SETUP_DIR="./.husky/_/"

echo "\n[INFO] CHECKING GLOBAL NODEJS..."
node --version || (echo "\n[INFO] NODEJS NOT FOUND, PLEASE INSTALL" && exit 1)

echo "\n[INFO] CHECKING COMMITIZEN..."
npm list -g commitizen || (echo "\n[INFO] COMMITIZEN NOT FOUND, INSTALLING..." && npm i -g commitizen)

if [ -d "$MODULE_DIR" ]; then
    echo "\n[INFO] HUSKY LOCAL IS ALREADY INSTALLED, SKIPPING..."
else
    echo "\n[INFO] HUSKY NOT INSTALLED, INSTALLING..."
    pnpm i husky
fi

if [ -d "$MODULE_SETUP_DIR" ]; then
    echo "\n[INFO] HUSKY SETUP WAS FOUND, SKIPPING..."
else
    echo "\n[INFO] HUSKY SETUP IS NOT RUN YET, RUNNING..."
    npx husky install
fi

echo "\n[INFO] ALL COMPLETED..."

exit 0
