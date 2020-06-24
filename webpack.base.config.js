const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const PATHS = {
    src: path.join(__dirname, './src'),
    dist: path.join(__dirname, './dist'),
    assets: 'assets/'
};

module.exports = {
    externals: {
        paths: PATHS
    },
    entry: {
        bundle: `${PATHS.src}/main.js`,
    },
    output: {
        filename: `${PATHS.assets}js/[name].[hash].js`,//указываем расположение внутри dist assets/js/main.js
        path: PATHS.dist,
        publicPath: ''
    },
    resolve: {
        extensions: ['.js', '.css'],
        alias: {
            CSS: path.resolve(__dirname, 'src/styles/'),
        },
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: '/node_modules/'
        }, {
            test: /\.(png|jpg|gif|svg|jpeg)$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
            },
        }, {
            test: /\.scss$/,
            use: [
                'style-loader',
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                        url: false
                    }
                }, {
                    loader: 'postcss-loader',
                    options: {sourceMap: true}
                }, {
                    loader: 'sass-loader',
                    options: {sourceMap: true}
                }
            ],
        }, {
            test: /\.css$/,
            use: [
                'style-loader',
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {sourceMap: true}
                }, {
                    loader: 'postcss-loader',
                    options: {sourceMap: true}
                }
            ],
        }]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}css/[name].[hash].css`,
        }),
        new HtmlWebpackPlugin({
            hash: false,
            template: `${PATHS.src}/index.html`,
            filename: './index.html',
        }),
        new CopyWebpackPlugin({
                patterns: [{
                    from: `${PATHS.src}/img`, to: `${PATHS.assets}img` //dist/assets/img/
                }, {
                    from: `${PATHS.src}/static`, to: ``//в корень dist
                },]

            }
        )
    ],
};