const webpack = require('webpack');

//const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const WebpackChunkHash = require('webpack-chunk-hash');

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const useVersioning = true;

module.exports =   merge(common, {
    mode: 'production',

    output: {
        filename: useVersioning ? '[name].[chunkhash:6].js' : "[name].js",
        publicPath: '/build/'
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use:  [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader",
                        options: {
                            minimize: true,
                        }
                    },
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader",
                        options: {
                            minimize: true,
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            "sourceMap": true //it needs if we use resolve-url-loader
                        }
                    }
                ]
            },

        ]
    },

    plugins: [
        //new ExtractTextPlugin('[name].css'),
        new MiniCssExtractPlugin({
            filename:  useVersioning ? '[name].[contenthash:6].css' : "[name].css"
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new ManifestPlugin({
            writeToFileEmit: true, //needs if we in dev mode with devServer
            basePath: 'build/',
            publicPath: 'build/'
        }),
        new WebpackChunkHash(),
        new webpack.HashedModuleIdsPlugin()
    ],

    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/
            }),
            new OptimizeCSSAssetsPlugin()
        ]
    }
});
