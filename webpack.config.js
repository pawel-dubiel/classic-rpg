 module.exports = {
     entry: './src/run.js',
     output: {
         path: './bin',
         filename: 'app.bundle.js'
     },
     module: {
         loaders: [{
             test: /\.js$/,
             exclude: /node_modules/,
             loader: 'babel-loader'
         }]
     }

 };