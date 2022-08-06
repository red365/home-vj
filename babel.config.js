function devMode() {
  const args = process.argv;
  var isDevMode = false;
  if (args[2] == "--mode" && args[3] == "dev") {
    isDevMode = true;
  }
  return isDevMode;
}

module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }]
  ],
  plugins: devMode() ? ['react-refresh/babel'] : []
};
