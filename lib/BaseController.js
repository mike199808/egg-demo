'use strict';
const Controller = require('egg').Controller;

// 基础的Controller类
class BaseController extends Controller {
  constructor(ctx) {
    super(ctx);
    return new Proxy(this, {
      get(target, key) {
        // 记录Controller被调用的函数
        const value = Reflect.get(target, key);
        // 只记录非构造函数
        if (typeof value === 'function' && target.constructor.name !== 'constructor') {
          ctx.logger.info(`Call Controller: ${target.constructor.name} -> ${key}`);
        }
        return value;
      },
    });
  }
}
module.exports = BaseController;
