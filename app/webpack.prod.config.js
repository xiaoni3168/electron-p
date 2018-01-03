const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SvgStore = require('webpack-svgstore-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        index: path.resolve(__dirname, 'index.js'),
        vendor: ['vue', 'vue-router', 'vuex', 'moment']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: ExtractTextPlugin.extract({
                            use: 'css-loader',
                            fallback: 'vue-style-loader'
                        }),
                        sass: ExtractTextPlugin.extract({
                            use: [
                                {
                                    loader: 'css-loader!postcss-loader'
                                },
                                {
                                    loader: 'sass-loader'
                                }
                            ],
                            fallback: 'vue-style-loader'
                        })
                    }
                }
            },
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
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    plugins: [
        new SvgStore({
            // svgo options
            svgoOptions: {
                plugins: [
                    { removeTitle: true }
                ]
            },
            prefix: ''
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            chunks: ['index'],
            minChunks: Infinity
        }),
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            chunks: ['vendor', 'index'],
            filename: 'index.html',
            template: path.resolve(__dirname, 'index.html'),
            inject: 'body'
        }),
        new CopyWebpackPlugin([
            { from: path.resolve(__dirname, 'app.manifest'), to: path.resolve(__dirname, 'dist/app.manifest') }
        ])
    ]
}