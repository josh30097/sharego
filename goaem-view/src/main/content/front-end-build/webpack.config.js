const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const postcss = require('postcss');
const webpack = require('webpack');

// build variables
const NODE_MODULES = path.resolve(__dirname, './node_modules');
const PATH_TO_SIDECAR = '../jcr_root/etc/designs/shared/';

module.exports = {
    // the base directory for resolving the entry option
    context: path.resolve(__dirname),
    resolve: {
        root: path.resolve(__dirname),
        fallback: NODE_MODULES,
        // tell webpack to look for these filetypes.
        // empty string tells webpack to resolve modules that
        // have their file extension provided
        extensions: ['', '.js', '.scss'],
    },
    resolveLoader: {
        root: NODE_MODULES
    },
    entry: {
        'shared-common': './shared-common-components.js'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract([
                    'css?importLoaders=1&sourceMap', // css loader
                    'postcss?sourceMap', //post-css loader
                    'sass?sourceMap', // sass loader
                ])
            }
        ]
    },
    sassLoader: {
        sourceMap: true
    },
    // output path
    output: {
        path: path.resolve(__dirname, PATH_TO_SIDECAR + 'shared-dist/'),
        filename: '[name].js'
    },
    plugins: [
        // remove dist-folder at start of every build
        new CleanWebpackPlugin('shared-dist', {
            root: path.resolve(__dirname, PATH_TO_SIDECAR),
            verbose: true // write logs to console.
        }),
        // export a .css file
        new ExtractTextPlugin('[name].css'),
    ],
    postcss: function () {
        return [
            require('autoprefixer')({ browsers: ['last 2 versions', '> 10%'] }),
        ];
    }
}
