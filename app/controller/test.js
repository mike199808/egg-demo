'use strict';

const Controller = require('egg').Controller;

class TestController extends Controller {
  async index() {
    console.log('我是控制器test');
    const date = await this.service.printdate.getDate();
    console.log('现在的北京时间是' + date);
    this.ctx.body = '现在的北京时间是' + date;
  }
}

module.exports = TestController;
