'use strict';

const Controller = require('egg').Controller;

class SequelizeController extends Controller {

  // 向Users表格插入数据
  async insertUsers() {
    const ctx = this.ctx;
    try {
      await ctx.model.Users.create({
        account: ctx.query.account,
        password: ctx.query.password,
      });
      console.log('Users成功插入数据');
      ctx.body = 'Users成功插入数据';
    } catch (err) {
      this.ctx.body(err);
      console.log(err);
    }
  }
  // 向Information表格插入数据
  async insertInformation() {
    try {
      const ctx = this.ctx;
      await ctx.model.Information.create({
        name: ctx.query.name,
        sex: ctx.query.sex,
        User_id: ctx.query.User_id,
      });
      console.log('Information成功插入数据');
      this.ctx.body = 'Information成功插入数据';
    } catch (err) {
      console.log(err);
    }
  }
  // 查询函数，可以查询Users和Information表格
  async query() {
    const ctx = this.ctx;
    try {
      let result;
      if (ctx.query.table === 'Users') {
        result = await ctx.model.Users.findAll({
          where: {
            account: ctx.query.account,
          },
        });
      } else {
        result = await ctx.model.Information.findAll({
          where: {
            name: ctx.query.name,
          },
        });
      }
      console.log(result);
      this.ctx.body = result;
    } catch (err) {
      console.log(err);
    }
  }
  // 删除函数，可以删除Users和Information表格的内容
  async delete() {
    const ctx = this.ctx;
    try {
      if (ctx.query.table === 'Information') {
        await ctx.model.Information.destroy({
          where: {
            name: ctx.query.name,
          },
        });
      } else {
        await ctx.model.Users.destroy({
          where: {
            account: ctx.query.account,
          },
        });
      }
      console.log('删除成功');
      ctx.body = '删除成功';
    } catch (err) {
      console.log(err);

    }
  }
  // 更新函数，可以单独更新Users或Information表格，也可以两个表格一起更新
  async update() {
    const ctx = this.ctx;
    const t = await ctx.model.transaction();
    try {
      if (ctx.query.table === 'Users') {
        await ctx.model.Users.update({
          password: ctx.query.password,
        }, {
          where: {
            account: ctx.query.account,
          },
        });
      } else if (ctx.query.table === 'Information') {
        await ctx.model.Information.update({
          sex: ctx.query.sex,
        }, {
          where: {
            name: ctx.query.name,
          },
        });
      } else {
        await ctx.model.Users.update({
          password: ctx.query.password,
        }, {
          where: {
            account: ctx.query.account,
          },
          transaction: t,
        });
        await ctx.model.Information.update({
          sex: ctx.query.sex,
        }, {
          where: {
            name: ctx.query.name,
          },
        });
        await t.commit();
      }
      console.log('更新成功');
      this.ctx.body = '更新成功';
    } catch (err) {
      console.log(err);
      await t.rollback();// 失败后回滚，不更新
    }
  }
  // 联合查询函数
  async multilistQuery() {
    let result;
    const ctx = this.ctx;
    try {
      result = await ctx.model.Information.findOne({
        where: {
          name: ctx.query.name,
        },
        include: [{
          model: ctx.model.Users,
        }],
      });
    } catch (err) {
      console.log(err);
      this.ctx.body = '发生错误';
    }
    console.log('查询成功');
    ctx.body = result;
  }

}

module.exports = SequelizeController;
