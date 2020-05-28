import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import session from 'express-session'
import { graphqlUploadExpress } from 'graphql-upload'
import { MikroORM } from 'mikro-orm'
import mongoose from 'mongoose'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { config } from './config'
import { Event, EventTag, Image, User } from './entity'
import { Book } from './entity/Book'
import { DI } from './mikroconfig'

// eslint-disable-next-line
const MongoStore = require('connect-mongo')(session)

;(async () => {
  const app = express()

  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }))

  // Connect to MongoDB:
  mongoose.connect(`mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.db}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  mongoose.connection.once('open', () => {
    console.log('connected to database')
  })

  DI.orm = await MikroORM.init({
    entitiesDirs: ['dist/entity'],
    entitiesDirsTs: ['src/entity'],
    dbName: 'bowie',
    type: 'mongo',
    clientUrl: 'mongodb://localhost:27017',
    logger: console.log.bind(console),
    debug: true,
    autoFlush: true,
    ensureIndexes: true,
  })
  DI.em = DI.orm.em
  DI.bookRepository = DI.orm.em.getRepository(Book)
  DI.userRepos = DI.orm.em.getRepository(User)
  DI.eventRepos = DI.orm.em.getRepository(Event)
  DI.eventTagRepos = DI.orm.em.getRepository(EventTag)
  DI.imageRepos = DI.orm.em.getRepository(Image)

  app.use(
    session({
      store: new MongoStore({
        mongooseConnection: mongoose.connection,
      }),
      name: 'qid',
      secret: process.env.SESSION_SECRET || 'aslkdfjoiq12312',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
      },
    }),
  )

  const schema = await buildSchema({
    resolvers: [
      __dirname + '/resolvers/**/*.resolver.{ts,js}',
      __dirname + '/resolvers/**/*.{ts,js}',
      __dirname + '/resolvers/*.{ts,js}',
      __dirname + '/resolvers/*.resolver.{ts,js}',
    ],
    validate: false,
  })

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
    introspection: true,
    playground: true,
    uploads: false, // disable apollo upload property
  })

  apolloServer.applyMiddleware({ app, cors: false })

  // schedule
  // cron.schedule('0 0 * * * *', () => {
  // const request = {
  // query: `{
  // getBooks{
  // books{
  // title
  // }
  // }
  // }`,
  // }
  // const rs = apolloServer.executeOperation(request).then((d) => {
  // console.log('rs', d)
  // })
  // })

  app.listen(config.express.port, (err) => {
    if (err) return console.error(err)
    return console.log(`server is listening on http:localhost:${config.express.port}/graphql`)
  })
})()
