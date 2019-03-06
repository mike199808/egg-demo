// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportInformation = require('../../../app/model/Information');
import ExportUsers = require('../../../app/model/Users');

declare module 'sequelize' {
  interface Sequelize {
    Information: ReturnType<typeof ExportInformation>;
    Users: ReturnType<typeof ExportUsers>;
  }
}
