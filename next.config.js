module.exports = {
  exportPathMap: function () {
    return {
      "/": { page: "/" },
      "/books": { page: "/books" }
    }
  },
  webpack: (config, { dev }) => {
    config.module.rules = config.module.rules.map(rule => {
      if(rule.loader === 'babel-loader') {
        rule.options.cacheDirectory = false
      }
      return rule
    })
    return config
  }
}
