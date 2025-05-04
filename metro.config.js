const { getDefaultConfig } = require('@expo/metro-config');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  return {
    ...config,
    resolver: {
      ...config.resolver,
      extraNodeModules: {
        ...config.resolver.extraNodeModules,
        // Provide empty implementations for Node.js modules
        stream: require.resolve('./empty-module'),
        ws: require.resolve('./empty-module'),
        crypto: require.resolve('./empty-module'),
        net: require.resolve('./empty-module'),
        tls: require.resolve('./empty-module'),
        dns: require.resolve('./empty-module'),
        'stream-browserify': require.resolve('./empty-module'),
        events: require.resolve('./empty-module'),
        https: require.resolve('./empty-module'),
        http: require.resolve('./empty-module'),
        zlib: require.resolve('./empty-module'),
        buffer: require.resolve('./empty-module')
      },
      sourceExts: [...config.resolver.sourceExts, 'mjs'],
    }
  };
})(); 