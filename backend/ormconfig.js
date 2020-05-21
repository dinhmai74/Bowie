module.exports = [
  {
    name: 'development',
    type: 'mongodb',
    host: 'localhost',
    port: 27017,
    database: 'bowie',
    synchronize: true,
    logging: true,
    entities: ['./src/entity/**/*.ts'],
    migrations: ['./src/migration/**/*.ts'],
    subscribers: ['./src/subscriber/**/*.ts'],
    cli: {
      entitiesDir: './src/entity',
      migrationsDir: './src/migration',
      subscribersDir: './src/subscriber',
    },
  },
  {
    name: 'production',
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: true, // switch this to false once you have the initial tables created and use migrations instead
    logging: false,
    entities: ['./dist/entity/**/*.js'],
    migrations: ['./dist/migration/**/*.js'],
    subscribers: ['./dist/subscriber/**/*.js'],
    cli: {
      entitiesDir: './dist/entity',
      migrationsDir: './dist/migration',
      subscribersDir: './dist/subscriber',
    },
  },
]
