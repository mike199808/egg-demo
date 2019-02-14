'use strict';
const Service = require('egg').Service;

class PrintdateService extends Service {
  async getDate() {
    const date = new Date();
    return date;
  }
}

module.exports = PrintdateService;
