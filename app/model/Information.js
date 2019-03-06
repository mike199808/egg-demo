'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Information = app.model.define('Information', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: STRING, allowNull: false },
    sex: { type: STRING, allowNull: false },
    User_id: { type: INTEGER, references: { model: app.model.Users, key: 'id' } },
    created_at: DATE,
    updated_at: DATE,
  });
  Information.associate = () => {
    Information.belongsTo(app.model.Users, { foreignkey: 'User_id' });
  };

  return Information;
};
