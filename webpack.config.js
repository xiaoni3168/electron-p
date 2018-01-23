const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        main: path.resolve(__dirname, 'main.js')
    },
    output: {
        path: path.resolve(__dirname, '_pack'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015']
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js']
    },
    target: 'electron'
}