'use strict';
module.exports = options => {
  return async function request(ctx, next) {
    // 记录请求
    ctx.logger.info(`Request: ${ctx.method} ${ctx.originalUrl} ${ctx.request.rawBody}`);
    ctx._beginTime = Date.now();

    await next();
  };
};
