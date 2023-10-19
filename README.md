
# TypeScript + Node.js Project Setup

**A tool for setting up a TypeScript + Node.js project with one command.**

Creating a new TypeScript + Node.js project often involves several steps such as installing TypeScript, configuring a `tsconfig.json` file, and setting up the directory structure. This tool simplifies the process by automating these tasks.

## Features

- Install TypeScript and Node.js types.
- Create a tsconfig.json file with common configuration.
- Set up a src directory for your TypeScript source files.
- Create a build directory for your compiled JavaScript files.
- Convert the default index.ts file to JavaScript.

## Installation

Ensure that you have Node.js and npm installed on your machine.
To create a new TypeScript + Node.js project, navigate to your desired project directory and run the following command:

```bash
npx ndtscript
```
You can start writing your TypeScript code in the src directory, and when you're ready to compile it, simply run: 

```bash
npx tsc
```

## File Structure

Your project directory structure will look like this:

```bash

my-project/
  ├── node_modules/...
  ├── src/
  |    ├── index.ts
  ├── build/
  |    ├── index.js  
  ├── package.json
  ├── package-lock.json  
  ├── tsconfig.json

```

## Customization
If you need to customize your project setup, you can modify the tsconfig.json and other project files as needed.

## Contributing
Contributions and feature requests are welcome. Please open an issue or submit a pull request.

## Contact
If you have any questions or need assistance, feel free to reach out at podkisaki@gmail.com.
