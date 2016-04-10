#!/bin/sh

# build bundle
- rm -r -f ./dist; npm run bundle

# deploy demo to gh pages
- cp package.json ./dist/package.json
- cp .travis.yml ./dist/.travis.yml
- cd ./dist
- git init
- git config user.name "Travis CI"
- git config user.email "me@platane.me"
- git add .
- git commit -m "Release"
- git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:release > /dev/null 2>&1
- cd ..
