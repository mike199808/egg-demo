'use strict';
module.exports = {

  createError(msg, code, arg_props) {
    const props = arg_props;
    const err = msg instanceof Error ? msg : new Error(msg);
    if (code) {
      err.code = this.config.errCode.APP_ERROR_CODE + code;
    } else {
      err.code = this.config.errCode.APP_ERROR_CODE + (this.config.errCode.NOT_REGISTER_ERROR || '000000');
      this.ctx.logger.warn(`当前错误码未登记，错误信息: ${err.message}`);
    }

    if (props) {
      for (const key in props) {
        if (props.hasOwnProperty(key)) {
          err[key] = props[key];
        }
      }
    }
    return err;
  },

  md5withKey(data, key) {
    const hash = crypto.createHash('md5');
    hash.update(data);
    hash.update(key);
    return hash.digest('hex');
  },

  aesEncrypt({ type = 'aes-256-cbc', data, key, iv, inputEncoding = 'utf8', outputEncoding = 'hex' }) {
    const cipher = crypto.createCipheriv(type, key, iv);
    let crypted = cipher.update(data, inputEncoding, outputEncoding);
    crypted += cipher.final(outputEncoding);
    return crypted;
  },

  aesDecrypt({ type = 'aes-256-cbc', data, key, iv, inputEncoding = 'hex', outputEncoding = 'utf8' }) {
    const decipher = crypto.createDecipheriv(type, key, iv);
    let decrypted = decipher.update(data, inputEncoding, outputEncoding);
    decrypted += decipher.final(outputEncoding);
    return decrypted;
  },

  dateFormat(date = new Date(), fmt = 'yyyy-MM-dd hh:mm:ss') { // author: meizz
    const o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      S: date.getMilliseconds(), // 毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (String(date.getFullYear())).substr(4 - RegExp.$1.length))   // eslint-disable-line
    for (let k in o) if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr((String(o[k])).length))) // eslint-disable-line
    return fmt;
  },
};
