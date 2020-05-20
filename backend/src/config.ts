const PRODUCTION = process.env.NODE_ENV === 'production'

interface ExpressConfig {
  port: number
  ip: string
}

interface MongodConfig {
  port: number | string
  host: string
  db: string
}

interface Config {
  express: ExpressConfig
  mongodb: MongodConfig
}

const config: Config = {
  express: {
    port: Number(process.env.EXPRESS_PORT) || 4000,
    ip: '192.168.1.9',
  },
  mongodb: {
    port: process.env.MONGODB_PORT || 27017,
    host: process.env.MONGODB_HOST || 'localhost',
    db: 'bowie',
  },
}

if (PRODUCTION) {
  // for example
  config.express.ip = '0.0.0.0'
}
// config.db same deal
// config.email etc
// config.log

export { config }
