import log4js from 'log4js';

log4js.configure({
    appenders: {
        console: {
            type: 'console',
            layout: {
                type: 'pattern',
                pattern: '%[[%d{yyyy-MM-dd hh:mm:ss.SSS}] [%p] %c -%] %m',
            },
        },
        app: {
            type: 'file',
            filename: 'logs/app.log',
            maxLogSize: 10485760,
            backups: 3,
            compress: true,
            layout: {
                type: 'pattern',
                pattern: '[%d{yyyy-MM-dd hh:mm:ss.SSS}] [%p] %c - %m',
            },
        },
    },
    categories: {
        default: { appenders: ['console', 'app'], level: 'info' },
    },
});

export const logger = log4js.getLogger('app');