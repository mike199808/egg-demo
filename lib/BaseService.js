'use strict';
const Service = require('egg').Service;

class BaseService extends Service {
  constructor(ctx) {
    super(ctx);
    return new Proxy(this, {
      get(target, key) {
        // 记录Service被调用的函数
        const value = Reflect.get(target, key);
        // 只记录非构造函数
        if (typeof value === 'function' && target.constructor.name !== 'constructor') {
          ctx.logger.info(`Call Service: ${target.constructor.name} -> ${key}`);
        }
        return value;
      },
    });
  }
}
module.exports = BaseService;
