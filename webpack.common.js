//const CopyWebpackPlugin = require('copy-webpack-plugin');

const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
//const webpack = require('webpack');
//import webpack from 'webpack';

module.exports = {
    entry: {
        homepage: "./assets/js/homepage.js",
        //tantamaresk: "./assets/js/tantamaresk.js",
       // adminPhoto: "./assets/js/adminPhoto.js"
    },
    output: {
        path: path.resolve(__dirname , "public.local", "build"),
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                "@babel/preset-react"
                            ],
                            plugins: [
                                '@babel/plugin-proposal-class-properties',
                                "@babel/plugin-syntax-dynamic-import"
                            ]
                        }
                    }/*,
                    {
                        loader: "eslint-loader"
                    }*/
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|ico|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]-[hash:7].[ext]'
                        }
                    },
                    {
                        loader: "image-webpack-loader",
                        options: {
                            svgo:{
                                plugins: [
                                    {
                                        removeViewBox: false
                                    },
                                    {
                                        cleanupIDs: false
                                    }
                                ]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]-[hash:7].[ext]'
                        }
                    }
                ]
            },
        ]
    },

    optimization: {
        splitChunks: {
            chunks: "all"
            /*cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2
                }
            }*/
        }
    },

    plugins: [
        new CleanWebpackPlugin(),
       /* new CopyWebpackPlugin([
            { from: './assets/static', to: 'static' }
        ])*/
    ],


};

