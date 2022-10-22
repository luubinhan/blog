---
slug: "/2019-03-19-huong-dan-setup-react-app-tu-a-toi-z"
date: "2019-03-19"
title: "Tạo React Boilerplate - Từ a tới z"
desc: "Một ngày nào đó bạn ko muốn dùng create-react-app để khởi tạo project nữa, thì đây chính là bài hướng dẫn bạn cần đọc: setup một project từ a tới z mà không dùng create-react-app"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["react"]
---

Tạo thư mục mới nào

```powershell
mkdir react-bolt
```

Vào bên trong thư mục `react-bolt` vừa tạo, chạy lệnh init

```powershell
npm init -y
```

Lệnh này sẽ khởi tạo một project npm, trong đó có file `package.json`, nơi chúng ta chứa toàn bộ những dependencies

Chúng ta tạo thêm một số thư mục cần thiết khác

```
react-bolt
    |--config
    |--src
    |--tests
```

Tiến hành cài đặt `webpack` và một số plugin

```powershell
npm i --save-dev webpack webpack-cli webpack-dev-server webpack-merge html-webpack-plugin clean-webpack-plugin img-loader url-loader file-loader 
```

Bên trong thư mục `config`, chúng ta tạo thêm thư mục tên `webpack`, chúng ta tạo lần lượt 5 file bên dưới trong thư mục `webpack`

**paths.js**

```js
import path from 'path';

module.exports = {
    root: path.resolve(__dirname, '../', '../'),
    outputPath: path.resolve(__dirname, '../', '../', 'build'),
    entryPath: path.resolve(__dirname, '../', '../', 'src/index.js'),
    templatePath: path.resolve(__dirname, '../', '../', 'src/index.html'),
    imagesFolder: 'images',
    fontsFolder: 'fonts',
    cssFolder: 'css',
    jsFolder: 'js'
};
```

**rules.js**

```js
module.exports = [
    {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader'
        }
    },
    {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /node_modules/,
        loader: 'file-loader'
    },
    {
        test: /\.(woff|woff2)$/,
        exclude: /node_modules/,
        loader: 'url-loader?prefix=font/&limit=5000'
    },
    {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
    },
    {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: ['url-loader?limit=10000', 'img-loader']
    }
];
```

**webpack.common.babel.js**

```js
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import paths from './paths';
import rules from './rules';

module.exports = {
    entry: paths.entryPath,
    module: {
        rules
    },
    resolve: {
        modules: ['src', 'node_modules'],
        extensions: ['*', '.js', '.scss', '.css']
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            template: paths.templatePath,
            minify: {
                collapseInlineTagWhitespace: true,
                collapseWhitespace: true,
                preserveLineBreaks: true,
                minifyURLs: true,
                removeComments: true,
                removeAttributeQuotes: true
            }
        })
    ]
};
```

**webpack.dev.babel.js**

```js
import webpack from 'webpack';

import paths from './paths';
import rules from './rules';

module.exports = {
    mode: 'development',
    output: {
        filename: '[name].js',
        path: paths.outputPath,
        chunkFilename: '[name].js'
    },
    module: {
        rules
    },
    performance: {
        hints: 'warning',
        maxAssetSize: 450000,
        maxEntrypointSize: 8500000,
        assetFilter: assetFilename => {
            return (
                assetFilename.endsWith('.css') || assetFilename.endsWith('.js')
            );
        }
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    devServer: {
        contentBase: paths.outputPath,
        compress: true,
        hot: true,
        historyApiFallback: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};
```

**webpack.prod.babel.js**

```js
import CleanWebpackPlugin from 'clean-webpack-plugin';

import paths from './paths';
import rules from './rules';

module.exports = {
    mode: 'production',
    output: {
        filename: `${paths.jsFolder}/[name].[hash].js`,
        path: paths.outputPath,
        chunkFilename: '[name].[chunkhash].js'
    },
    module: {
        rules
    },
    plugins: [
        new CleanWebpackPlugin([paths.outputPath.split('/').pop()], {
            root: paths.root
        })
    ],
    devtool: 'source-map'
};
```

Bên trong `webpack.common.babel.js` chúng ta sẽ setup entry và output và các plugin. Các thiết đặt để chạy môi trường dev sẽ nằm trong `webpack.dev.babel.js` và môi trường production sẽ nằm trong `webpack.prod.babel.js` 

Sau cùng, bên trong thư mục gốc, tạo thêm file `webpack.config.js` nó sẽ merge 3 file config common, dev, prod lại

```js
require('@babel/register');
const webpackMerge = require('webpack-merge');

const common = require('./config/webpack/webpack.common.babel');

const envs = {
    development: 'dev',
    production: 'prod'
};

/* eslint-disable global-require,import/no-dynamic-require */
const env = envs[process.env.NODE_ENV || 'development'];
const envConfig = require(`./config/webpack/webpack.${env}.babel`);
module.exports = webpackMerge(common, envConfig);
```

## Babel

Cái các plugin cần thiết cho babel

```powershell
npm install --save-dev @babel/core @babe/cli @babel/node @babel/plugin-proposal-class-properties @babel/plugin-proposal-object-rest-spread @babel/plugin-syntax-dynamic-import @babel/plugin-syntax-import-meta @babel/plugin-transform-async-to-generator @babel/plugin-transform-runtime @babel/preset-env @babel/preset-react @babel/register @babel/runtime babel-eslint babel-jest babel-loader babel-core@7.0.0-bridge.0
```

Tạo file `.babelrc` bên trong thư mục gốc, thiết đặt babel khi chạy

```js
{
    "presets": [
        [
            "@babel/preset-env",
            {
                "useBuiltIns": "entry"
            }
        ],
        "@babel/preset-react"
    ],
    "plugins": [
        "@babel/plugin-proposal-object-rest-spread",
        "@babel/plugin-transform-runtime",
        "@babel/plugin-transform-async-to-generator",
        "@babel/plugin-proposal-class-properties"
    ]
}
```

## Eslint

Cài đặt package 

```powershell
npm install --save-dev eslint eslint-config-airbnb eslint-config-prettier eslint-loader eslint-plugin-babel eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-prettier eslint-plugin-react 
```

Bên trong thư mục gốc, tạo file `.eslintrc` để cấu hình cho eslint

```json
{
    "parser": "babel-eslint",
    "extends": ["airbnb", "prettier", "prettier/react"],
    "plugins": ["prettier"],
    "parserOptions": {
        "ecmaVersion": 6,
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "env": {
        "browser": true,
        "node": true,
        "mocha": true,
        "es6": true,
        "jest": true
    },
    "rules": {
        "indent": ["error", 4],
        "space-before-function-paren": "off",
        "react/prefer-stateless-function": "warn",
        "react/jsx-one-expression-per-line": "off",
        "import/no-extraneous-dependencies": [
            "error",
            { "devDependencies": true }
        ],
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "linebreak-style": "off",
        "global-require": "off",
        "semi": "warn",
        "arrow-body-style": "off",
        "no-multiple-empty-lines": ["warn", { "max": 1 }],
        "no-unused-expressions": [
            "error",
            {
                "allowTaggedTemplates": true
            }
        ],
        "no-underscore-dangle": [
            2,
            { "allow": ["__REDUX_DEVTOOLS_EXTENSION__"] }
        ]
    }
}
```

## Prettier

Cài đặt package

```powershell
npm install --save-dev prettier
```

Tạo file `.prettierrc` với nội dung

```js
{
    "printWidth": 80,
    "tabWidth": 4,
    "semi": true,
    "singleQuote": true,
    "bracketSpacing": true
}
```

## React

Cuối cùng chúng ta chỉ còn cài React nữa là xong

```powershell
npm install --save react react-dom cross-env
```

Bên trong thư mục `src`, tạo file `index.html`

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>React Bolt</title>
    </head>

    <body>
        <div id="root"></div>
    </body>
</html>
```

File `index.js` trong thư mục *src*

```js
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
```

Mấy cái router, redux thì bạn cứ xem tài liệu của tụi nó nhé.

## Jest

Bạn có thể dùng cái khác để test, nhưng Jest thì phổ biến nhất rồi

```powershell
npm install --save-dev jest jest-dom react-testing-library
```

Bổ sung lệnh để chạy test trong `package.json`

```js
"jest": {
    "setupFiles": [
        "<rootDir>/config/tests/jest.config"
    ],
    "transform": {
        "^.+\\.js$": "babel-jest"
    }
 },
"scripts": {
    "start": "cross-env NODE_ENV=development webpack-dev-server --open",
    "build": "cross-env NODE_ENV=production webpack",
    "lint": "eslint ./src/**/**.js",
    "lint:fix": "eslint ./src/**/**.js --fix",
    "test": "jest",
    "test:watch": "npm run test --watch",
    "test:cover": "npm run test --coverage"
}
```

**config/tests/jest.config.js**

```js
module.exports = {
    automock: false,
    browser: false,
    bail: false,
    collectCoverageFrom: [
        'src/**/*.{js,jsx}',
        '!**/node_modules/**',
        '!**/vendor/**'
    ],
    coverageDirectory: '<rootDir>/coverage',
    globals: {
        __DEV__: true
    },
    moduleFileExtensions: ['js', 'json', 'jsx', 'node'],
    transform: {
        '^.+\\.js?$': 'babel-jest'
    },
    verbose: true,
    setupTestFrameworkScriptFile: './rtl.setup.js'
};
```

**config/tests/rtl.setup.js**

```js
// See https://github.com/kentcdodds/react-testing-library#global-config
import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';
```

Xong.

[Source code ở đây](https://github.com/leonardomso/react-bolt)

<a target="_blank" rel="noopener noreferrer" href="https://medium.freecodecamp.org/a-complete-react-boilerplate-tutorial-from-zero-to-hero-20023e086c4a">Link bài gốc - A Complete React Boilerplate Tutorial — From Zero to Hero</a>