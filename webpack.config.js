var path = require("path")
module.exports = {
  entry: path.resolve('./src/App.js'),
  output: {
    path: path.resolve('./public/'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:3000/public/',
  },
  devServer: {
    inline: true,
    contentBase: path.resolve('./public'),
    port: 3333,
  },
  node: {
    fs: 'empty'
  },
  resolve: {
    modules: [path.resolve(__dirname, '/src'), 'node_modules/'],
    descriptionFiles: ['package.json'],
    extensions : ['.js', '.ts']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: path.resolve('./node_modules/'),
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test: /\.(jpg|jpeg|gif|png|ico)$/,
        exclude: path.resolve('./node_modules/'),
        loader:'file-loader?name=img/[path][name].[ext]&context=./app/images'
      }
    ]
  }
}