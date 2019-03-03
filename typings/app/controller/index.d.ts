// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome = require('../../../app/controller/home');
import ExportSequelize = require('../../../app/controller/sequelize');

declare module 'egg' {
  interface IController {
    home: ExportHome;
    sequelize: ExportSequelize;
  }
}
