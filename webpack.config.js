const path = require('path');

module.exports = {
    entry: ['./js/main.js', './css/main.scss'],
    module: {
        rules: [{
            test: /\.s[ac]ss$/i,
            use: [
                // Creates `style` nodes from JS strings
                'style-loader',
                // Translates CSS into CommonJS
                'css-loader',
                // Compiles Sass to CSS
                'sass-loader',
            ],
        }, ],
    },
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.css'],
        modules: [
            'node_modules'
        ]
    }
};