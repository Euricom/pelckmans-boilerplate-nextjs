module.exports = {
  reactStrictMode: true,
  images: {
    loader: 'imgix',
    path: '',
  },
  webpack: function (config) {

    config.resolve.fallback = { fs: false, path: false };

    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader'
    })
    return config
  }
}
