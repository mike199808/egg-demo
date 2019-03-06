'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Users = app.model.define('Users', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    account: { type: STRING, allowNull: false },
    password: { type: STRING, allowNull: false },
    created_at: DATE,
    updated_at: DATE,
  });

  return Users;
};
