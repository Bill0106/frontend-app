const path = require('path')

const config = {
  context: path.join(__dirname, '../', 'src'),
  entry: {
    admin: [
      './main.ts'
    ]
  },
  output: {
    path: path.join(__dirname, '../', 'dist')
  },
  resolve: {
    extensions: ['.js', '.ts', '.scss', '.css', '.html']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015']
            }
          },
          {
            loader: 'awesome-typescript-loader'
          },
          {
            loader: 'angular2-template-loader'
          }
        ]
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.(scss|sass|css)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ],
      }
    ]
  }
}

module.exports = config
