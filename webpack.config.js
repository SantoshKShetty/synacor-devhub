const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const loadEnvConfig = require('./scripts/env-loader');

// Load Environment Settings.
loadEnvConfig();

module.exports = {
    // the output bundle won't be optimized for production but suitable for development
    mode: 'development',
    // the app entry point is /src/index.js
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
        // the output of the webpack build will be in /dist directory
        path: path.resolve(__dirname, 'build'),
        // the filename of the JS bundle will be bundle.js
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [
                    {
                        options: {
                            multiple: [
                                { search: /\{\{CLIENT\}\}/g, replace: process.env.CLIENT },
                                { search: /\{\{ORG\}\}/g, replace: process.env.ORG },
                                { search: /\{\{CLOUD_ID_API\}\}/g, replace: process.env.CLOUD_ID_API },
                                { search: /\{\{KEYCLOAK_URL\}\}/g, replace: process.env.KEYCLOAK_URL }
                            ]
                        },
                        loader: require.resolve('string-replace-loader'),
                    },
                ]
            },
            {
                // for any file with a suffix of js or jsx
                test: /\.jsx?$/,
                // ignore transpiling JavaScript from node_modules as it should be that state
                exclude: /node_modules/,
                // use the babel-loader for transpiling JavaScript to a suitable format
                loader: 'babel-loader',
                options: {
                    // attach the presets to the loader (most projects use .babelrc file instead)
                    presets: ["@babel/preset-env", "@babel/preset-react"]
                }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
    },
    // add a custom index.html as the template
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html')
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'public', 'client-assets'),
                    to: path.resolve(__dirname, 'build', 'client-assets')
                },
            ]
        })
    ]
};