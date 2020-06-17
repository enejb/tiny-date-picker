const path = require('path');

const common = {
    mode: 'production',
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
            }
        ]
    },
    resolve: {
        extensions: ['.ts']
    },
}

const commonOutput = {
    path: path.resolve(__dirname, 'dist'),
    globalObject: 'this'
}

const TinyDatePicker = {
    entry: './src/date-picker.ts',
    output: {
        filename: 'tiny-date-picker.js',
        library: 'TinyDatePicker',
        ...commonOutput
    },
    ...common
}

const TinyDateRangePicker = {
    entry: './src/date-range-picker.ts',
    output: {
        filename: 'tiny-date-range-picker.js',
        library: 'TinyDateRangePicker',
        ...commonOutput
    },
    ...common
}

module.exports = [
    TinyDatePicker,
    TinyDateRangePicker
]
