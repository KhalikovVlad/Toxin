const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
let mode = 'development';

const webpackConfig = {
    mode: mode,
    context: path.resolve(__dirname, '../src'),
    entry: {
        landingPage: path.resolve(__dirname, '../src/landingPage.js'),
        test: path.resolve(__dirname, '../src/test.js')
    },
    output: {
                clean: true,
                path: path.resolve(__dirname, '../dist'),
                filename: '[name]/[name].js',
            },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        'postcss-preset-env',
                                        {
                                            // options
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                    'sass-loader'
                ],
            },
            {
                test: /\.(ico|png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'img/[name].[ext]'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name].[ext]'
                }
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                options: {
                    pretty: true
                }
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name]/[name].css',
            chunkFilename: '[name].css'
        }),
        new HtmlWebpackPlugin({
            template: "../src/pages/landing-page/landing-page.pug",
            title: 'landing-page',
            filename: 'landingPage/landingPage.html',
            favicon: '../src/favicon/favicon.ico',
            chunks: ['landingPage']
        }),
        new HtmlWebpackPlugin({
            template: "../src/pages/registration-page/registration-page.pug",
            title: 'registration-page',
            filename: 'registrationPage/registrationPage.html',
            favicon: '../src/favicon/favicon.ico',
            chunks: ['registrationPage']
        }),
        new HtmlWebpackPlugin({
            template: "../src/pages/room-details-page/room-details-page.pug",
            title: 'room-details-page',
            filename: 'roomDetailsPage/roomDetailsPage.html',
            favicon: '../src/favicon/favicon.ico',
            chunks: ['roomDetailsPage']
        }),
        new HtmlWebpackPlugin({
            template: "../src/pages/search-room-page/search-room-page.pug",
            title: 'search-room-page',
            filename: 'searchRoomPage/searchRoomPage.html',
            favicon: '../src/favicon/favicon.ico',
            chunks: ['searchRoomPage']
        }),
        new HtmlWebpackPlugin({
            template: "../src/pages/sing-in-page/sing-in-page.pug",
            title: 'sing-in-page',
            filename: 'singInPage/singInPage.html',
            favicon: '../src/favicon/favicon.ico',
            chunks: ['singInPage']
        }),
        new HtmlWebpackPlugin({
            template: "../src/pages/test/test.pug",
            title: 'test',
            filename: 'test/test.html',
            favicon: '../src/favicon/favicon.ico',
            chunks: ['test']
        }),
    ],
    devServer: {
        static: {
          directory: path.join(__dirname, '../dist'),
        },
        compress: true,
        port: 3000,
        hot: true
    },
};

module.exports = webpackConfig;