'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1550146299467_7316';

  // add your config here
  config.middleware = [ 'forbidip' ];
  config.forbidip = {
    ip: '127.0.0.1',
  };
  // config.api = '127.0.0.1';
  return config;
};
