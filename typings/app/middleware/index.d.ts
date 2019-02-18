// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportErrCatch = require('../../../app/middleware/errCatch');
import ExportForbidip = require('../../../app/middleware/forbidip');
import ExportRequest = require('../../../app/middleware/request');
import ExportResponse = require('../../../app/middleware/response');
import ExportUuid = require('../../../app/middleware/uuid');

declare module 'egg' {
  interface IMiddleware {
    errCatch: typeof ExportErrCatch;
    forbidip: typeof ExportForbidip;
    request: typeof ExportRequest;
    response: typeof ExportResponse;
    uuid: typeof ExportUuid;
  }
}
