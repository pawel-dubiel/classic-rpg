var path = require('path');

var fs = require('fs');
var nodeModules = {};

fs.readdirSync(path.resolve(__dirname, 'node_modules'))
    .filter(x => ['.bin'].indexOf(x) === -1)
    .forEach(mod => {
        nodeModules[mod] = `commonjs ${mod}`;
    });


module.exports = [{

        name: 'server',
        entry: './src/server/index.js',
        target: 'node',
        output: {
            path: './bin',
            filename: 'server.js'
        },
        externals: nodeModules,
        module: {
            loaders: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }, {
                test: /\.json$/,
                loader: 'json-loader'
            }, ]
        }

    },


    {
        name: 'client',
        entry: './src/client.js',
        target: 'node',
        output: {
            path: './bin',
            filename: 'client.bundle.js'
        },

        module: {
            loaders: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }]
        }

    }


];