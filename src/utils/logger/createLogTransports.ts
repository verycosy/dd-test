import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { infoFilter, masking, tracerId } from './logFormat';

const { transports, format } = winston;
const { combine, timestamp, json } = format;

const defaultFormat = combine(timestamp(), masking(), tracerId(), json());

export function createLogTransports(): winston.transport[] {
  const isProduction = process.env.NODE_ENV === 'production';
  if (isProduction) {
    return [
      new transports.File({
        filename: './logs/info.log',
        level: 'info',
        format: combine(infoFilter(), defaultFormat),
      }),
      new transports.File({
        filename: './logs/error.log',
        level: 'error',
        format: defaultFormat,
      }),
      createDailyRotateFileTransport(),
    ];
  }

  return [
    new transports.Console({
      level: 'debug',
      format: combine(
        nestWinstonModuleUtilities.format.nestLike('두구두구', {
          colors: true,
          prettyPrint: true,
        }),
      ),
    }),
  ];
}

function createDailyRotateFileTransport() {
  const dailyRotateFile = new transports.DailyRotateFile({
    filename: './logs/combined-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxSize: '20m',
    maxFiles: '14d',
    format: defaultFormat,
    zippedArchive: true,
  });

  dailyRotateFile.on('new', (filename) => {
    console.log('NEW ' + filename);
  });

  dailyRotateFile.on('rotate', (oldFilename, newFilename) => {
    console.log('ROTATE ' + oldFilename + ' > ' + newFilename);
  });

  dailyRotateFile.on('archive', (zipFilename) => {
    console.log('ARCHIVE ' + zipFilename);
  });

  dailyRotateFile.on('logRemoved', (removedFiledname) => {
    console.log('LOG REMOVED ' + removedFiledname);
  });

  return dailyRotateFile;
}
