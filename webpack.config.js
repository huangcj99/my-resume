//noinspection NodeJsCodingAssistanceForCoreModules
let path = require('path');
let webpack = require('webpack');

let APP_PATH = path.resolve(__dirname, './src/app.jsx');
let BUILD_PATH = path.resolve(__dirname, './build/');

module.exports = {
    devtool: "source-map",
    entry:APP_PATH,
    output: {
        path: BUILD_PATH,
        filename: 'bundle.js',
    },
    plugins: [
        //让模块不用再引入react中的React
        new webpack.ProvidePlugin({
            'React':'react',
        }),
        new webpack.ProvidePlugin({
            'AM':'amazeui-react',
        })
    ],
    module: {
        loaders: [
            {
                test: /\.(jsx|js)$/,
                exclude: /node_modules/,
                loaders: ['babel-loader?presets[]=es2015,presets[]=stage-0,presets[]=react']
            },{
                test: /\.css$/,
                exclude: /node_modules/,
                loader: 'style-loader!css-loader?modules'
            },{
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: 'style-loader!css-loader?modules!sass-loader'
            }
        ]

    }
};