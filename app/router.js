'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // router.get('/test', controller.test.index);
  // router.get('/sequelize', controller.sequelize.echo);
  // router.get('/sequelize/createtable', controller.sequelize.createtable);
  router.get('/sequelize/insertUsers', controller.sequelize.insertUsers);
  router.get('/sequelize/insertInformation', controller.sequelize.insertInformation);
  router.get('/sequelize/query', controller.sequelize.query);
  router.get('/sequelize/delete', controller.sequelize.delete);
  router.get('/sequelize/update', controller.sequelize.update);
  router.get('/sequelize/multilistQuery', controller.sequelize.multilistQuery);
};
