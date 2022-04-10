module.exports = {
  reactStrictMode: true,
  exportPathMap: (
    _defaultPathMap,
    { _dev, _dir, _outDir, _distDir, _buildId }
  ) => {
    return {
      "/": { page: "/" },
    };
  },
  images: {
    domains: ["b.hatena.ne.jp"],
  },
};
