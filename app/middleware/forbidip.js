'use strict';

module.exports = (options, app) => {
  return async function forbidIp(ctx, next) {
    console.log(options.ip[0]);
    const forbidip = options.ip[0];
    if (ctx.request.ip === forbidip) {
      ctx.body = '你的ip已经被屏蔽';
      ctx.status = 403;
    } else {
      await next();
    }
  };
}
;
