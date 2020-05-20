"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PRODUCTION = process.env.NODE_ENV === 'production';
const config = {
    express: {
        port: Number(process.env.EXPRESS_PORT) || 4000,
        ip: '192.168.1.9',
    },
    mongodb: {
        port: process.env.MONGODB_PORT || 27017,
        host: process.env.MONGODB_HOST || 'localhost',
        db: 'bowie',
    },
};
exports.config = config;
if (PRODUCTION) {
    config.express.ip = '0.0.0.0';
}
//# sourceMappingURL=config.js.map