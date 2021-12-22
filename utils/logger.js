const winston = require('winston');

if (process.env.NODE_ENV !== 'test') {
  const winstonLogger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.File({
        filename: './logs/error.log',
        level: 'error',
      }),
      new winston.transports.File({ filename: './logs/combined.log' }),
    ],
    stream: {
      /* eslint-disable object-shorthand, func-names */
      write: (message) => winstonLogger.http(message),
      /* eslint-enable object-shorthand, func-names */
    },
  });

  if (process.env.NODE_ENV !== 'production') {
    winstonLogger.add(
      new winston.transports.Console({
        format: winston.format.simple(),
        colorize: true,
      }),
    );
  }
}

const winstonLogger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: './logs/testing.log',
    }),
  ],
});

module.exports = winstonLogger;
