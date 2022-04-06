const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
let mode = 'production';

const webpackConfig = {
    mode: mode,
    context: path.resolve(__dirname, '../src'),
    entry: {
        landingPage: path.resolve(__dirname, '../src/landingPage.js')
    },
    output: {
                path: path.resolve(__dirname, '../dist'),
                filename: `[name]/[name].[hash].js`,
                clean: true
            },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    (mode === 'development') ? 'style-loader' : MiniCssExtractPlugin.loader,
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
                    filename: 'img/[name][hash].[ext]'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][hash].[ext]'
                }
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                exclude: /node_modules/,
                options: {
                    pretty: false
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
        new MiniCssExtractPlugin({
            filename: '[name]/[name].[hash].css',
            chunkFilename: '[name][hash].css'
        }),
        new HtmlWebpackPlugin({
            template: "../src/pages/landing-page/landing-page.pug",
            title: 'landing-page',
            filename: 'landingPage/landingPage.html',
            favicon: '../src/img/favicon/favicon.ico'
        }),
        new HtmlWebpackPlugin({
            template: "../src/pages/registration-page/registration-page.pug",
            title: 'registration-page',
            filename: 'registrationPage/registrationPage.html',
            favicon: '../src/img/favicon/favicon.ico'
        }),
        new HtmlWebpackPlugin({
            template: "../src/pages/room-details-page/room-details-page.pug",
            title: 'room-details-page',
            filename: 'roomDetailsPage/roomDetailsPage.html',
            favicon: '../src/img/favicon/favicon.ico'
        }),
        new HtmlWebpackPlugin({
            template: "../src/pages/search-room-page/search-room-page.pug",
            title: 'search-room-page',
            filename: 'searchRoomPage/searchRoomPage.html',
            favicon: '../src/img/favicon/favicon.ico'
        }),
        new HtmlWebpackPlugin({
            template: "../src/pages/sing-in-page/sing-in-page.pug",
            title: 'sing-in-page',
            filename: 'singInPage/singInPage.html',
            favicon: '../src/img/favicon/favicon.ico'
        }),
    ],
};

module.exports = webpackConfig;