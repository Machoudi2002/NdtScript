#!/usr/bin/env node
import { exec, execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

const newTsConfigContent = {
  "compilerOptions": {
    "target": "es5",                          
    "module": "commonjs",                    
    "lib": ["es6"],                     
    "allowJs": true,
    "outDir": "./build",                          
    "rootDir": "./src",
    "strict": true,         
    "noImplicitAny": true,
    "esModuleInterop": true,
    "resolveJsonModule": true
  },

  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]

}

function greenLog(message) {
  console.log('\x1b[32m' + message + '\x1b[0m');
}

function redError(message) {
  console.error('\x1b[31m' + message + '\x1b[0m');
}

function checkFileExist(srcfolder_path, filename) {

  try {
      fs.mkdirSync(srcfolder_path);
      greenLog(` - The ${srcfolder_path} folder has been created.`);
      const indexFilePath = path.join(srcfolder_path, filename);
      const indexFileContent = 'console.log("Hello, World!");\n';
      if (!fs.existsSync(indexFilePath)) {
        try {
          fs.writeFileSync(indexFilePath, indexFileContent, 'utf-8');
          greenLog(` - The ${filename} file has been created.`);
        } catch (err) {
          redError(`Error creating the ${filename} file:`, err);
        };
      } else {
        console.log(`\x1b[35m - The ${filename} file already exists.`);
      };
  } 
  catch (err) {
      if (err.code === 'EEXIST') {
        console.log(`\x1b[35m - The ${srcfolder_path} folder already exists.`);
          const indexFilePath = path.join(srcfolder_path, filename);
          const indexFileContent = 'console.log("Hello, World!");\n';
          if (!fs.existsSync(indexFilePath)) {
          try {
              fs.writeFileSync(indexFilePath, indexFileContent, 'utf-8');
              greenLog(` - The ${filename} file has been created.`);
          } catch (err) {
              redError(`Error creating the ${filename} file:`, err);
          };
          } else {
            console.log(`\x1b[35m - The ${filename} file already exists.`);
          };
        
      } else {
        redError(`Error creating the ${srcfolder_path} folder:`, err);
      }
  }

}




function ndt() {

    function loadingAnimation() {
        console.log("\x1b[36m")
        let i = 0;
        const animationFrames = ['|', '/', '-', '\\'];
        return setInterval(() => {
          process.stdout.write(`\rInstalling... ${animationFrames[i % 4]}`);
          i++;
        }, 250);
      }
  
    console.log('\x1b[36mInitializing your project... \x1b[0m');

    // Setup Node.js package.json
    const package_json_command = "npm init -y";
    exec(package_json_command, (error, stdout, stderr) => {
        if (error) {
            redError(`Error Initializing your project: ${error}`);
            return;
        }

        greenLog('Project initialized.\nPackage.json has been successfully created');
        const loadingInterval = loadingAnimation();

        // Add TypeScript as a dev dependency
        const TypeScript_dev_command = "npm install typescript --save-dev";
        exec(TypeScript_dev_command, (error, stdout, stderr) => {
            clearInterval(loadingInterval);
            if (error) {
                redError(`- Error Installing TypeScript as a dev dependency: ${error}`);
                return;
            } 
            greenLog("\n- TypeScript has been successfully installed as a dev dependency");

            // Install ambient Node.js types for TypeScript
            const node_types_command = "npm install @types/node --save-dev"
            exec(node_types_command, (error, stdout, stderr) => {
                if (error) {
                    redError(`Error Installing ambient Node.js types for TypeScript: ${error}`);
                    return;
                } 
                greenLog("- ambient Node.js types for TypeScript has been successfully installed");

                // Creating ./src with index.ts and ./build with index.js
                checkFileExist("./src", "index.ts");
                checkFileExist("./build", "index.js");

                // Creating tsconfig.json file
                const CREATE_TSCONFiG_command = "npx tsc --init --rootDir ./src --outDir ./build \ --esModuleInterop --resolveJsonModule --lib es6 \ --module commonjs --allowJs true --noImplicitAny true"
                exec(CREATE_TSCONFiG_command, (error, stdout, stderr) => {
                if (error) {
                    redError(`Error Creating a tsconfig.json: ${error}`);
                    return;
                } 
                greenLog("\n- tsconfig.json has been successfully installed");

                // Updating tsconfig.json content for some errors

                const tsconfigPath = './tsconfig.json';
                const modifiedTsconfig = JSON.stringify(newTsConfigContent, null, 2);

                fs.writeFile(tsconfigPath, modifiedTsconfig, 'utf-8', (err) => {
                  if (err) {
                    redError('Error writing tsconfig.json:', err);
                  } else {
                    greenLog('- tsconfig.json has been updated.');
                  }
                });


                const newPathname = './src';

                if (fs.existsSync(newPathname)) {
                  process.chdir(newPathname);
                } else {
                  redError(`the path ${newPathname} doesn't exists`);
                  checkFileExist("./src", "index.ts");

                }

                    const node_types_command = "npx tsc"
                    exec(node_types_command, (error, stdout, stderr) => {
                    if (error) {
                        redError(`Error running the command: ${error}`);
                        return;
                    } 
                    greenLog("- typescript file successfully compiled to index.js on ./build");

                });
              });
            });
        });
    });
}

ndt();