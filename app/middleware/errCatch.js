'use strict';
module.exports = options => {
  return async function errCatch(ctx, next) {
    try {
      await next();
    } catch (err) {
      ctx.set('Content-Type', 'application/json');
      const errCode = ctx.app.config.errCode;
      console.log(ctx.app.config);
      const body = {
        code: err.code || (errCode.APP_ERROR_CODE + errCode.NOT_REGISTER_ERROR),
        traceId: ctx.tracer.traceId,
      };
      if (options.responseErrorMsg) {
        body.message = err.message ? err.message : err.toString();
      }
      ctx.body = JSON.stringify(body);
      ctx.status = 200;
      ctx.logger.error(err);
    }
  };
};
