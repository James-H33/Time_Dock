const debug = process.env.NODE_ENV !== "production";
const webpack = require('webpack');

module.exports = {
    context: __dirname,
    devtool: debug ? "inline-sourcemap" : null,
    entry: './src/js/functions.js',
    output: {
        path: './public/js',
        filename: 'scripts.js'
    },
    module: {
        loaders: [
            { test: /\.sass$/, loaders: ["style", "css", "sass"] },
            { test: /\.css$/, loaders: ["style", "css"] },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    plugins: debug ? [] : [
       new webpack.optimize.DedupePlugin(),
       new webpack.optimize.OccurenceOrderPlugin(),
       new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
   ]
}
