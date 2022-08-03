import * as winston from 'winston';
import * as rTracer from 'cls-rtracer';

export function masking() {
  return winston.format((info) => {
    if (info.body?.password) {
      info.body.password = '******';

      if (info.body?.retypedPassword) {
        info.body.retypedPassword = '******';
      }
    }

    return info;
  })();
}

export function tracerId() {
  return winston.format((info) => {
    const tracerId = rTracer.id();

    if (tracerId) info.tracerId = tracerId;
    return info;
  })();
}

export function infoFilter() {
  return winston.format((info) => {
    if (info.level === 'info') {
      return info;
    }

    return false;
  })();
}
