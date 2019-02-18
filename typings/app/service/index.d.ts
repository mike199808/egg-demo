// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportPrintdate = require('../../../app/service/printdate');

declare module 'egg' {
  interface IService {
    printdate: ExportPrintdate;
  }
}
