const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const common = {
    mode: 'development',
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
                   "css-loader",
                ]
             }
        ]
    },
    resolve: {
        extensions: ['.ts']
    },
    plugins: [
        new MiniCssExtractPlugin()
    ]
}

const commonOutput = {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    globalObject: 'this'
}

const TinyDatePicker = {
    entry: {
        'TinyDatePicker': './src/date-picker.ts',
        'TinyDatePickerStyle': './src/date-picker.css'
    },
    output: {
        library: 'TinyDatePicker',
        ...commonOutput
    },
    ...common
}

const TinyDateRangePicker = {
    entry: {
        'TinyDateRangePicker': './src/date-range-picker.ts',
        'TinyDateRangePickerStyle': './src/date-range-picker.css'
    },
    output: {
        library: 'TinyDateRangePicker',
        ...commonOutput
    },
    ...common
}

module.exports = [
    TinyDatePicker,
    TinyDateRangePicker
]
