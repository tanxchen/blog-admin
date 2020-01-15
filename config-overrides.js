const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackPlugin,
  addWebpackAlias,
  getBabelLoader,
  addWebpackModuleRule,
  tap
} = require('customize-cra');

const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

module.exports = {
  webpack: override(
    config => {
      config.devtool = config.mode === 'development'
        ? 'cheap-module-source-map'
        : false

      // config.output.publicPath = './'

      config.plugins.forEach(item => {
        if (item instanceof HtmlWebpackPlugin) {
          item.options.version = getVersion()
        }
      })

      config.performance = getPerformance()

      return config
    },
    // tap({ message: "Pre-Customizers" }),
    // ****** ant-design config  start ******
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true
    }),
    addLessLoader({
      javascriptEnabled: true,
      modifyVars: { '@primary-color': '#1DA57A' }
      // modifyVars: { '@primary-color': '#1890ff' }
    }),
    addWebpackPlugin(new AntdDayjsWebpackPlugin()),
    // ****** ant-design config end ******
    addWebpackAlias(getAliasConfig()),
    //
    addWebpackModuleRule(getModuleSassLoaderConfig()),
    addWebpackModuleRule(getSassLoaderConfig())
    //
    // tap({ dest: 'customize-cra.log' })
  )
}

function getPerformance() {
  return {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
    assetFilter: function (assetFilename) {
      return assetFilename.endsWith('.js')
    }
  }
}

function getVersion() {
  let date = new Date()
  // toJSON 的时区补偿
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
  return date.toJSON().substr(0,19).replace(/[-T:]/g, '')
}

function getAliasConfig() {
  return {
    '@': path.resolve(__dirname,'src'),
    '_com': path.resolve(__dirname,'src/components'),
    '_img': path.resolve(__dirname,'src/assets/images'),
    '_sty': path.resolve(__dirname,'src/assets/styles')
  }
}

function getModuleSassLoaderConfig() {
  return {
    test: /\.module.s[ac]ss$/i,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: {
            localIdentName: '[local]_[hash:base64:8]'
          }
        }
      },
      {
        loader: 'sass-loader',
        options: {
          prependData: '@import "~@/variables.sass";'
        }
      }
    ]
  }
}

function getSassLoaderConfig() {
  return {
    test: /\.s[ac]ss$/i,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: false
        }
      },
      {
        loader: 'sass-loader',
        options: {
          prependData: '@import "~@/variables.sass";'
        }
      }
    ]
  }
}
