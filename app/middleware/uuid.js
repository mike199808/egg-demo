'use strict';
const uuidv4 = require('uuid/v4');

module.exports = options => {
  return async function uuid(ctx, next) {
    // 设置uuid
    ctx.tracer = { traceId: uuidv4() };
    await next();
  };
};
