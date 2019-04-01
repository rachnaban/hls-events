const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    devtool: "source-map",
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.bundle.js',
    },
    plugins: [        
        new MiniCssExtractPlugin({
            filename: "../css/index.css"
        }),
        new HtmlWebpackPlugin({ template: './src/index.html' })
    ],
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        //presets: ['@babel/preset-react', '@babel/preset-env'], // <-- use this for testing IE locally
                        presets: ['@babel/preset-react', ['@babel/preset-env', { "exclude": ["transform-regenerator"] }]],  // <-- use this for debugging locally with Chrome (non-obfuscated try catches)
                        plugins: [['@babel/plugin-proposal-decorators', { legacy: true }], "@babel/plugin-syntax-dynamic-import", ["@babel/plugin-proposal-class-properties", { "loose": true }]]
                    }
                }
            },
            {
                test: /\.scss$/,
                exclude: /exclude/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { url: false, sourceMap: true } },
                    { loader: 'sass-loader', options: { sourceMap: true } }
                ]
            }
        ]
    }
};