'use strict';

const Controller = require('egg').Controller;
const Sequelize = require('sequelize');

const sequelize = new Sequelize('test1', 'root', '123456', {
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
// 测试是否连接成功
// sequelize.authenticate()
//   .then(() => {
//     console.log('successfully');
//   })
//   .catch(err => {
//     console.log(err);
//   });
// 定义模型
const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  account: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const information = sequelize.define('information', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  sex: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  // 与User关联的外键
  User_id: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },

});
class SequelizeController extends Controller {
  // 创建表格
  async createtable() {
    // sync中传force：true参数可以强制修改表格
    User.sync();
    information.sync();
    this.ctx.body = 'User和infotmation表格创建成功';
  }
  // 向User表格插入数据
  async insertUser() {
    try {
      await User.create({
        account: this.ctx.query.account,
        password: this.ctx.query.password,
      });
      console.log('User成功插入数据');
      this.ctx.body = 'User成功插入数据';
    } catch (err) {
      this.ctx.body(err);
      console.log(err);
    }
  }
  // 向information表格插入数据
  async insertInformation() {
    console.log(this.ctx.query);
    try {
      await information.create({
        name: this.ctx.query.name,
        sex: this.ctx.query.sex,
        User_id: this.ctx.query.User_id,
      });
      console.log('information成功插入数据');
      this.ctx.body = 'information成功插入数据';
    } catch (err) {
      console.log(err);
    }
  }
  // 查询函数，可以查询User和information表格
  async query() {
    try {
      let result;
      if (this.ctx.query.table === 'User') {
        result = await User.findAll({
          where: {
            account: this.ctx.query.account,
          },
        });
      } else {
        result = await information.findAll({
          where: {
            name: this.ctx.query.name,
          },
        });
      }
      console.log(result);
      this.ctx.body = ('查询结果为：' + result);
    } catch (err) {
      console.log(err);
    }
  }
  // 删除函数，可以删除User和information表格的内容
  async delete() {
    console.log(this.ctx.query);
    try {
      if (this.ctx.query.table === 'information') {
        await information.destroy({
          where: {
            name: this.ctx.query.name,
          },
        });
      } else {
        await User.destroy({
          where: {
            account: this.ctx.query.account,
          },
        });
      }
      console.log('删除成功');
      this.ctx.body = '删除成功';
    } catch (err) {
      console.log(err);

    }
  }
  // 更新函数，可以单独更新User或information表格，也可以两个表格一起更新
  async update() {
    console.log(this.ctx.query);
    const t = await sequelize.transaction();
    try {
      if (this.ctx.query.table === 'User') {
        await User.update({
          password: this.ctx.query.password,
        }, {
          where: {
            account: this.ctx.query.account,
          },
        });
      } else if (this.ctx.query.table === 'information') {
        await information.update({
          sex: this.ctx.query.sex,
        }, {
          where: {
            name: this.ctx.query.name,
          },
        });
      } else {
        await User.update({
          password: this.ctx.query.password,
        }, {
          where: {
            account: this.ctx.query.account,
          },
          transaction: t,
        });
        await information.update({
          sex: this.ctx.query.sex,
        }, {
          where: {
            name: this.ctx.query.name,
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
    try {
      information.belongsTo(User, { foreignKey: 'User_id' });
      result = await information.findOne({
        where: {
          name: this.ctx.query.name,
        },
        include: [{
          model: User,
        }],
      });
    } catch (err) {
      console.log(err);
      this.ctx.body = '发生错误';
    }
    console.log('查询成功');
    console.log(result);
  }

}

module.exports = SequelizeController;
