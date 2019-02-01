## trpg-server
[![Build Status](https://dev.azure.com/TRPG-server/TRPGServer/_apis/build/status/Misaka-0x447f.TRPGServer?branchName=master)](https://dev.azure.com/TRPG-server/TRPGServer/_build/latest?definitionId=1&branchName=master)

This project is still under development and only support Chinese(Simplified) for now.  
CI/CD configured using azure. Access CD version here:
[trpg.misaka.org](http://trpg.misaka.org)

## Project setup
```
npm install
```

## Do's
### Using Resolved Config as a File
Some external tools may need access to the resolved webpack config as a file, for example IDEs or command line tools that expect a webpack config path. In that case you can use the following path:

<projectRoot>/node_modules/@vue/cli-service/webpack.config.js

This file dynamically resolves and exports the exact same webpack config used in vue-cli-service commands, including those from plugins and even your custom configurations.
https://cli.vuejs.org/guide/webpack.html#using-resolved-config-as-a-file

### Apply settings from tslint.json
Some IDEs may able to import settings from config file. Remember to do this.

### Place right things in to right folders
To create vue views, make a folder in that name and create view as index.vue.
To create public components, just do that in page folder.

### Use libs before create util packages.
Consider get your tools from libs like lodash first.

## Do not's
### Do not compile typescript files in IDE
Some IDEs may be able to compile typescript files automatically. Do not do that while we auto done this.

### Do not create 'components' folder
You can create public components folder in pages folder:
```
./src/pages/_/MyPublicComponent.vue
```

### Do not make node_modules more black hole
You should not use very simple js lib like 'is-odd' or 'is-numeric'. Make a function in utils folder.

### Do not use yarn
Npm is good enough, It's 2018 now.

### Do not bypass tslint-loader check
Obviously.
