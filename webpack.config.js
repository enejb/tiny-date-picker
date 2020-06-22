const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');


module.exports = {
    mode: 'production',
    entry: './src/index.ts',
    optimization: {
        minimizer: [
            new TerserJSPlugin({}), 
            new OptimizeCSSAssetsPlugin({})
        ],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        configFile: 'tsconfig.prod.json'
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                    },
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts']
    },
    output: {
        library: 'TinyDatePicker',
        filename: 'tiny-date-picker.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: "umd",
        globalObject: 'this'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'tiny-date-picker.css',
        })
    ]
}

