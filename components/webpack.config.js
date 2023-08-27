module.exports = {
    // ... (other configuration options)
    resolve: {
      fallback: {
        fs: false,
        assert: require.resolve("assert/"),
        dns: require.resolve("dns/"),
        net: require.resolve("net/"),
        crypto: require.resolve("crypto-browserify"),
        util: require.resolve("util/"),
        stream: require.resolve("stream-browserify"),
        tls: require.resolve("tls/"),
        path: require.resolve("path-browserify"),
        buffer: require.resolve("buffer/"),
      },
    },
  };
  