// module.exports = {
//
// }

const webpack = require('webpack')

module.exports = {
  // target: 'node',
  node: {
      crypto: false,
      path: true,
      os: true,
      stream: true,
      buffer: false
  },
  plugins: [
         new webpack.DefinePlugin({
             'process.env.NODE_ENV': JSON.stringify('production')
         })
     ]

}
