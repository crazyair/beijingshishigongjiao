let isTesting, isDev, isProd;
getEnvalues();
updateSingletonEnvValues();

function getEnvalues() {
  isTesting = process && process.env.NODE_ENV === 'testing';
  isDev = process && process.env.NODE_ENV === 'development';
  isProd = process && process.env.NODE_ENV === 'production';
}

function updateSingletonEnvValues() {
  module.exports.isTest = isTesting;
  module.exports.isTesting = isTesting;
  module.exports.isDev = isDev;
  module.exports.isDevelopment = isDev;
  module.exports.isProd = isProd;
  module.exports.isProduction = isProd;
}
