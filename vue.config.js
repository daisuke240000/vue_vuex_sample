module.exports = {
  css: {
    loaderOptions:{
      css:{
        sourceMap: true,
      },
      postcss:{
        sourceMap: true,
      }
    }
  },
  pages: {
    // index: {
    //   entry: 'src/main.js',
    //   template: 'public/index.html',
    //   filename: 'index.html'
    // },
    kaigo: {
      entry: 'src/main.js',
      template: 'public/kaigo/index.html',
      filename: '/dist/kaigo/index.html'
    },
    searchresult: {
      entry: 'src/main.js',
      template: 'public/kaigo/searchresult/index.html',
      filename: '/dist/kaigo/searchresult/index.html'
    },
    detail: {
      entry: 'src/main.js',
      template: 'public/kaigo/detail/index.html',
      filename: '/dist/kaigo/detail/index.html'
    }
  },
  devServer: {
    watchOptions: {
      poll: true,
    }
  },

  lintOnSave: undefined,

  pluginOptions: {
    i18n: {
      locale: 'jp',
      fallbackLocale: 'jp',
      localeDir: 'locales',
      enableInSFC: true
    }
  },
  publicPath: undefined,
  outputDir: '/dist/',
  assetsDir: 'kaigo/assets_vue/',
  runtimeCompiler: undefined,
  productionSourceMap: false,
  parallel: undefined,
  // chainWebpack: config => {
    // if (process.env.NODE_ENV === 'production'){
      //チャンクファイルを生成しないようにする
      // config.optimization.delete('splitChunks')
      //メインJSファイル名にハッシュ値をつけない
      // config.output
      //   .filename('[name].js')
    // }
  // },
};
