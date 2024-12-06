const path = require('path');

module.exports = {
  mode: 'development', // O 'production' según el entorno
  entry: './src/index.js', // Ruta de tu archivo principal de entrada
  output: {
    filename: 'bundle.js', // Nombre del archivo de salida
    path: path.resolve(__dirname, 'dist') // Directorio de salida
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        // Manejo de los warnings de los source maps
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: [
          /node_modules\/gaxios/,
          /node_modules\/googleapis-common/,
          /node_modules\/gcp-metadata/,
        ],
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    fallback: {
      util: require.resolve('util/'),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      vm: require.resolve('vm-browserify'),
      https: require.resolve('https-browserify'),
      http: require.resolve('stream-http'),
      assert: require.resolve('assert'),
      fs: false, // Desactiva fs ya que no se usa en el navegador
      path: false
    }
  },
  devtool: 'source-map', // Para ayudar en la depuración
};
