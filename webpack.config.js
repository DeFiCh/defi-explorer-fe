const webpack = require('webpack');
const neutrino = require('neutrino');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

const addEnvPlugin = (webpackConfig) => {
  const currentPath = path.join(__dirname);

  const envPath = currentPath + '/.env';

  const finalPath = fs.existsSync(envPath);

  if (finalPath) {
    const fileEnv = dotenv.config({ path: envPath }).parsed;

    const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
      prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
      return prev;
    }, {});
    if (webpackConfig.plugins && Array.isArray(webpackConfig.plugins)) {
      webpackConfig.plugins.push(new webpack.DefinePlugin(envKeys));
    } else {
      webpackConfig.plugins = [new webpack.DefinePlugin(envKeys)];
    }
  }
  return webpackConfig;
};

module.exports = () => {
  const neutrinoConfig = neutrino().webpack();
  const updatedneutrinoConfig = addEnvPlugin(neutrinoConfig);
  return updatedneutrinoConfig;
};
