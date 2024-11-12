# Steps to create React app:

___


### 1. npm init
This step sets up a package.json file, which is the core configuration file for your project and allows you to manage dependencies, scripts, and metadata.
Here's why you need npm init:
- Initialize a New Project:
    - The npm init command initializes a new Node.js project by generating a package.json file. This file is crucial for managing your project’s metadata, dependencies, and scripts.
- Track Dependencies:
    - React (and other related libraries) are dependencies that need to be tracked in your package.json. Without this file, npm (or Yarn) won't know which libraries your project needs to install.
    - When you run npm init, it creates a fresh package.json file where you will later add dependencies like react, react-dom, webpack, babel, etc.
- Managing Project Metadata:
    - npm init helps you set up important project details like the project name, version, description, entry point (index.js), author, license, and repository. This is useful for publishing your project or sharing it with others.
- Managing Scripts:
    - The package.json file allows you to define custom scripts (like npm start, npm build, etc.). For a React app, you'll need to configure scripts for building, bundling, and running the app using tools like Webpack, Babel, or a development server.
- Flexibility and Control:Using npm init without CRA gives you more control over how you structure your project and which tools you use. You can set up Webpack, Babel, ESLint, etc., to match your specific needs.
    - CRA automates a lot of this setup, but if you're building a custom React environment, npm init lets you choose exactly how everything is configured.

command: `npm init`


### 2. install babel dependencies
When creating a React application without using create-react-app (CRA), you need to install Babel dependencies to transpile your modern JavaScript code (including JSX syntax) into code that can run in all browsers. Here’s why Babel is necessary:

- Transpiling JSX:
    React uses JSX, a syntax extension that allows you to write HTML-like code in JavaScript. Browsers do not understand JSX natively, so Babel is used to convert JSX into React.createElement calls, which browsers can interpret.
- Supporting Modern JavaScript Features:
    React applications often use modern JavaScript (ES6+) features, like arrow functions, async/await, destructuring, and modules. Older browsers may not support these features, so Babel converts them into a compatible syntax.
- Configuring Babel for React and ES6:
    To ensure JSX and ES6+ syntax works correctly, you need specific Babel presets:
        @babel/preset-react: Enables support for JSX and other React-specific syntax.
        @babel/preset-env: Transpiles newer JavaScript syntax into a format that works in older browsers based on your defined browser compatibility settings.
- Development Tools:
    Babel also offers tools like babel-loader (for Webpack) to integrate with bundlers, which are needed to create development builds and production bundles.

Example of Required Babel Packages

    "devDependencies": {
        "@babel/core": "^7.x.x",
        "@babel/preset-env": "^7.x.x",
        "@babel/preset-react": "^7.x.x",
        "babel-loader": "^9.x.x" // if using Webpack
    }

For a React setup without CRA, you’d typically need the following Babel packages in your 
    
command: ```npm install --save-dev @babel/core babel-loader @babel/cli @babel/preset-env @babel/preset-react```
        
### 3. install webpack dependencies
If you're unfamiliar with Webpack, here's a brief summary of what it is and why its needed:
- Module Bundling:
    - React apps usually consist of multiple JavaScript files, and sometimes other assets like CSS, images, or fonts. Webpack is a module bundler that bundles all these different assets into optimized files for the browser to use.
    - Webpack takes all your JavaScript files (including React components), processes them, and outputs a single or multiple bundled files. This helps reduce the number of HTTP requests the browser makes, improving the app's performance.
- Transpiling Modern JavaScript (Babel):
    - React apps are often written using modern JavaScript features (ES6/ES7), which older browsers may not support.
    - Webpack, combined with Babel, allows you to transpile modern JavaScript (including JSX) into a format that is compatible with most browsers.
    - You need to configure Babel in Webpack to convert JSX syntax and ES6+ JavaScript (such as arrow functions, const, let, etc.) into browser-friendly JavaScript.
- Loading Assets:
    - React applications often use assets such as CSS files, images, or fonts. Webpack allows you to configure loaders to handle these files.
    - For instance, you can use style-loader and css-loader to handle and inject CSS into your JavaScript bundle. You can also use file-loader or url-loader to manage image files and other static assets.
- Development Server (webpack-dev-server):
    - Webpack has a development server (webpack-dev-server) that makes it easy to serve your React app locally while you develop.
    - It provides features like hot module replacement (HMR), which allows changes to your code to be reflected in the browser immediately without needing a page refresh. This greatly improves the development workflow.
- Optimizing the Build:
    - Webpack can optimize your build for production by minifying JavaScript, tree shaking unused code, and splitting the bundle into smaller chunks (using splitChunksPlugin).
    - This helps improve the app's loading time and overall performance in production.
- Custom Configuration:
    - One of the main advantages of creating a React app without CRA is customization. By using Webpack, you have full control over how the build process works, and you can add specific plugins, loaders, or optimizations that CRA might not provide.
    - You can configure Webpack to handle specific use cases, like code splitting, caching, or environment-specific builds.

_Note_: we will configure Webpack later in this guide. This step is purely for installing Webpack.

#### Summary:

In essence, Webpack is crucial in a custom React setup because it handles the bundling of your JavaScript code and assets, transpiles modern JavaScript (like JSX) into a format that all browsers can understand, and optimizes your app for both development and production. Without Webpack (and Babel), you would have to manually manage how your app's code is processed, bundled, and served to the browser, which can become quite complex.

command: ```npm install --save-dev webpack webpack-cli webpack-dev-server```

### 4. install HtmlWebpackPlugin
If you're unfamiliar with HtmlWebpackPlugin, here's a brief summary of what it is and why its needed:
-  Simplified HTML Template Generation:
    - In a React app, you'll need an index.html file that serves as the entry point for your application. This HTML file needs to include the bundled JavaScript files that Webpack generates.
    - Manually adding the \<script> tags for your JavaScript files in index.html can be error-prone, especially when Webpack splits your code into multiple chunks (e.g., vendor and application bundles). HtmlWebpackPlugin automates this process by automatically injecting the correct \<script> tags into your index.html file.
    - The plugin ensures that the right paths to the generated JS files are included (for example, with hashes in the filenames for cache busting).
- Incorporating Webpack Bundles into HTML:
    After Webpack processes your React code and generates bundles (JavaScript, CSS, etc.), HtmlWebpackPlugin dynamically updates the index.html file to reference those bundles.
    This ensures your HTML template always reflects the most recent output from Webpack, so you don’t have to manually edit the HTML every time you build or make changes to the bundle.
- Using a Custom HTML Template:
    - HtmlWebpackPlugin allows you to use a custom HTML template file. This means you can start with a base HTML file and let the plugin insert your Webpack bundles, including JavaScript and CSS, into the template.
    - The plugin can handle static assets, manage title tags, meta tags, and other essential parts of your HTML template. It reduces boilerplate code and ensures consistency in the build process.
- Minification for Production:
    - In production, you want your HTML file to be optimized (e.g., minified) to reduce file size and improve performance. HtmlWebpackPlugin can handle this automatically when configured with Webpack's production build settings.
    - It helps in producing a clean, optimized HTML file with minified code and correctly linked assets, ensuring your app loads as efficiently as possible.
- Adding Meta Tags and Other Elements:
    - In some cases, you may want to inject meta tags, links to stylesheets, or other elements (like Open Graph tags or analytics scripts) into your HTML. HtmlWebpackPlugin allows you to do this easily by adding those elements programmatically or using a custom template.
- Improving Developer Experience:
    - Using HtmlWebpackPlugin makes development easier by automating the inclusion of the right resources in the HTML file.
    - Without it, you'd have to manually modify the HTML to reflect any changes in Webpack's output, such as changes in file names or additions/removals of JavaScript files.

#### In Summary:

When you're creating a React app without create-react-app, you need HtmlWebpackPlugin to:
- Automatically inject the Webpack output (JS/CSS files) into your HTML file.
- Use custom HTML templates and inject dynamic data.
- Minify and optimize the HTML for production.
- Improve the efficiency of managing your app’s HTML, ensuring it always stays up-to-date with the correct Webpack output.
By automating these tasks, HtmlWebpackPlugin saves you time and ensures your HTML is always correctly set up.

command: ```npm install --save-dev html-webpack-plugin```

### 5. install react dependencies
    This step is necessary obviously to use react.
    The following packages should be installed as dev-dependencies:
        - react the actual react package that enables to use of react in our project
        - react-dom: serves as the entry point to the DOM and server renderers for React. It is the package that is used to create elements into the DOM (document object model) so that React apps can work. It is intended to be paired with the react package
    
    command: ```npm install react react-dom```

### 6. create project structure
#### 6.A.: Create a file called index.html in the root folder with the following code:
        
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>React App</title>
    </head>
    <body>
        <div id="root"></div>
    </body>
    </html>
    
This will be the entry file for the entire app, and the react app will live inside the root div.

#### 6.B: Create a file called index.js in the root foler with the following code:
    
    import React from 'react';
    import ReactDOM from 'react-dom/client';
    import App from './src/App';

    // Select the root DOM node where the app will be mounted
    const rootElement = document.getElementById('root');

    // Create a root using React 18's createRoot API
    const root = ReactDOM.createRoot(rootElement);

    // Render the main App component to the root element
    root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
    );
    
This will use react-dom package to inject the react app into the "root" div in the above index.html file.

#### 6.C: Creat a file called App.js (or whatever you would like you're most parent component to be named) in a folder called "src" (or again whatever you would prefer this folder to be named) with the following code:

    import React from "react";

    const App = () =>{
        return (
            <h1>
                Hello world! I am using React
            </h1>
        );
    };

    export default App;

This is the highest or most parent component in your application currently. This will be referenced in index.js which is then injected into a div in index.html

### 7. configure Babel
In the root folder create a file called .babelrc and add the following code:

    {
        "presets": ["@babel/preset-env","@babel/preset-react"]
    }

This tells Babel to use packages @babel/preset-env and @babel/preset-react that we installed earlier to compile our code.

### 8. configure Webpack
Create a file called webpack.config.js and add the following code:

    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const path = require('path');

    module.exports = {
    entry: './index.js',
    mode: 'development',
    target: 'web',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
    },
    devServer: {
        static: './dist',
        open: true,
        hot: true,
        liveReload: true,
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
    },
    module: {
        rules: [
        {
            test: /\.(js|jsx)$/, 
            exclude: /node_modules/, 
            use: 'babel-loader', 
        },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ]
    };

Breakdown of above: 

#### - Imports:

    ```
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const path = require('path');
    ```

- HtmlWebpackPlugin: This is a Webpack plugin used to simplify the creation of an HTML file for your application. It will automatically inject the necessary \<script> tags for your bundled JavaScript into your index.html file.
- path: This is a Node.js built-in module that helps with working with file and directory paths. It's used here to define the output.path where Webpack should place the bundled files.
#### - module.exports:
- The module.exports exports the Webpack configuration object, which Webpack uses to set up the build process.
#### - entry:

    `entry: './index.js',`

- entry specifies the entry point of your application, i.e., the file where Webpack should start bundling. In this case, it's ./index.js. This is the starting JavaScript file for your application, and Webpack will follow its dependencies to create the final bundled output.

#### - mode:

`mode: 'development',`

- mode sets the mode for Webpack's build process. The two possible values are 'development' and 'production'.
- 'development' mode enables features such as unminified output for easier debugging, faster build times, and source maps.
- 'production' mode optimizes the build for performance (e.g., minifying code, tree shaking unused code).

#### - target:

`target: 'web',`

- target specifies the environment for which Webpack is building the output.
- 'web' tells Webpack to build for the browser environment, which will handle DOM manipulation and other web-specific APIs. Webpack will generate code suitable for web browsers.

#### - output:

```
output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
},
```

- path specifies the output directory for bundled files.
- path.resolve(__dirname, './dist'): This will resolve to the absolute path of the dist directory, ensuring that the bundled files will be stored in this folder, relative to the root directory.
- filename: Specifies the name of the output bundle file. In this case, the output JavaScript file will be named bundle.js.

#### - devServer:

```
devServer: {
    static: './dist',
    open: true,
    hot: true,
    liveReload: true,
},
```

- devServer configures Webpack's development server (if you're using webpack-dev-server to run the app locally).
- static: './dist': The devServer will serve files from the dist directory.
- open: true: Automatically opens the browser when you run the development server.
- hot: true: Enables Hot Module Replacement (HMR), which allows you to update modules in the browser without needing a full page reload (useful for a better development experience).
- liveReload: true: Enables live reloading, so changes in the code will automatically trigger a page reload in the browser.

#### - resolve:

```
resolve: {
    extensions: ['.js', '.jsx', '.json'],
},
```

- resolve configures how Webpack resolves file extensions when importing modules.
- extensions: ['.js', '.jsx', '.json'] tells Webpack to resolve these file types automatically when they are imported, meaning you can omit the extension when importing modules, and Webpack will try these extensions in the order specified.

#### - module:

```
module: {
    rules: [
        {
            test: /\.(js|jsx)$/, 
            exclude: /node_modules/, 
            use: 'babel-loader', 
        },
    ],
},
```

- module specifies how Webpack should handle different types of files (called "loaders").
- test: /\.(js|jsx)$/: This tells Webpack to use babel-loader for any JavaScript (.js) or JSX (.jsx) file it encounters.
- exclude: /node_modules/: Prevents node_modules from being processed by Babel, which speeds up the build process since you don't need to transpile third-party libraries.
- use: 'babel-loader': This specifies that babel-loader should be used to transpile the code. Babel will convert modern JavaScript (ES6, JSX, etc.) into a browser-compatible version.

#### - plugins:

```
plugins: [
    new HtmlWebpackPlugin({
        template: './index.html'
    })
]
```

- plugins is an array of plugins that extend Webpack's functionality.
- new HtmlWebpackPlugin({...}): This plugin generates an HTML file based on the provided template (index.html) and automatically injects the bundled JavaScript files into the \<script> tag. This means you don't need to manually reference your JavaScript files in the HTML.
- template: './index.html' specifies the path to the HTML template you want to use.

#### Summary:

- entry: Specifies the main file where Webpack starts bundling.
- output: Defines where the bundled files will be stored (dist folder) and their names.
- devServer: Configures the development server for local development, with features like auto-opening the browser and live reloading.
- resolve: Configures how Webpack resolves file extensions when importing files.
- module: Defines how to process .js and .jsx files using Babel.
- plugins: Uses HtmlWebpackPlugin to inject the bundled JavaScript into an HTML template.

This configuration is set up for a basic React application, allowing Webpack to bundle JavaScript, handle JSX, and serve the app with hot reloading in development.

### 9. add scripts in package.json
in package.json inside the scripts property, add an object which will be used to run Webpack and start our application. Add the following "scripts":

    "scripts": {
        "start": "webpack-dev-server --open --mode development --hot",
        "build": "webpack --mode production",
    },

### 10. run npm start to start the application
command: ```npm start``` or ```npm run start```

navigate to the port set in webpack.config.js if "open: true" is not set.