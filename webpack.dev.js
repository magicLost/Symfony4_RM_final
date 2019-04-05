const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

let useDevServer = false;
let publicPath = useDevServer ? 'http://localhost:8080/build/' : '/build/';

module.exports = merge(common, {
    mode: 'development',

    output: {
        publicPath: publicPath
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader",
                        options: {
                            "sourceMap": true
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            localIdentName: '[path][name]__[local]--[hash:base64:5]',
                            sourceMap: true
                        }
                    },
                ]
            },
            {
                test: /\.module.scss$/,
                use: [
                    {
                        loader: "style-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            localIdentName: '[name]__[local]--[hash:base64:9]',//'[path][name]__[local]--[hash:base64:5]'
                            sourceMap: true                        }
                    },
                    /* {
                         loader: "resolve-url-loader",
                         options: {
                             join: (filename, optionsHash) => {

                                 return (uri, base) => {
                                     let url = "C:/OSPanel_rek_b3/domains/node_modules/bootstrap-sass/assets";

                                     url += uri.substr(2);

                                     return url;
                                 };
                             },
                             debug: true,
                             absolute: true
                         }
                     },*/
                    {
                        loader: "sass-loader" ,
                        options: {
                            sourceMap: true,
                            sourceMapContents: false
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                exclude: /\.module.scss$/,
                use: [
                    {
                        loader: "style-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true                        }
                    },
                   /* {
                        loader: "resolve-url-loader",
                        options: {
                            join: (filename, optionsHash) => {

                                return (uri, base) => {
                                    let url = "C:/OSPanel_rek_b3/domains/node_modules/bootstrap-sass/assets";

                                    url += uri.substr(2);

                                    return url;
                                };
                            },
                            debug: true,
                            absolute: true
                        }
                    },*/
                    {
                        loader: "sass-loader" ,
                        options: {
                            sourceMap: true,
                            sourceMapContents: false
                        }
                    }
                ]
            },

        ]
    },

    devtool: 'inline-source-map',

    devServer: {
        contentBase: './build',
        hot: true,
        headers: { 'Access-Control-Allow-Origin': '*'}
    },

    plugins: [

        new webpack.HotModuleReplacementPlugin()

    ],
});
