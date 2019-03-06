'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 Users 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('Users', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      account: { type: STRING, allowNull: false },
      password: { type: STRING, allowNull: false },
      created_at: DATE,
      updated_at: DATE,
    });
  },
  // 在执行数据库降级时调用的函数，删除 Users 表
  down: async queryInterface => {
    await queryInterface.dropTable('Users');
  },
};
