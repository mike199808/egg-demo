'use strict';
const path = require('path');
const egg = require('egg');
const Controller = require('./BaseController');
const Service = require('./BaseService');
const EGG_PATH = Symbol.for('egg#eggPath');

class Application extends egg.Application {
  get [EGG_PATH]() {
    return path.dirname(__dirname);
  }
}

class Agent extends egg.Agent {
  get [EGG_PATH]() {
    return path.dirname(__dirname);
  }
}

// 覆盖原有egg控制器和服务
module.exports = Object.assign(egg, {
  Application,
  Agent,
  Controller,
  Service,
})
;
