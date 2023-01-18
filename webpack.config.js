const defaultConfig = require( '@wordpress/scripts/config/webpack.config.js' );
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
    ...defaultConfig,
    resolve: {
        alias: {
            ...defaultConfig.resolve.alias,
            process: "process/browser"
        },
    },
    plugins: [
        ...defaultConfig.plugins,
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
        new Dotenv({
          path: './.env',
        }),
    ],
    module: {
        ...defaultConfig.module,
        rules: [
            ...defaultConfig.module.rules,
          {
            test: /\.m?js$/,
            resolve: {
              fullySpecified: false
            },
          },
        ]
      }
}
