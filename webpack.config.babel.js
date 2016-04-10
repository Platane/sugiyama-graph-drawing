const path = require('path')
const webpack = require('webpack')

module.exports = {

    entry:

        process.env.BUNDLE
            ? {
                'bundle' : './src/sugiyama'
            }
            : {
                'demo' : [ './demo' ],
            }
    ,

    output: {
        libraryTarget: process.env.BUNDLE
            ? 'commonjs2'
            : 'var'
        ,
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
    },

    module: {

        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|\.tmp)/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'stage-1'],
                }
            },

            {
                test: /\.html?$/,
                exclude: /node_modules/,
                loaders: [],
            },

            {
                test: /\.css$/,
                loader: 'style!css'
            },

        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"' + process.env.NODE_ENV + '"'
            },
        }),

        ...(
            process.env.NODE_ENV = 'production'
                ? [ new webpack.optimize.UglifyJsPlugin({ compress: {warnings: false} }) ]
                : []
        )
    ],
}
