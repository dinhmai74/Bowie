"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const mikro_orm_1 = require("mikro-orm");
const mongoose_1 = __importDefault(require("mongoose"));
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const config_1 = require("./config");
const entity_1 = require("./entity");
const Book_1 = require("./entity/Book");
const mikroconfig_1 = require("./mikroconfig");
const resolvers_1 = require("./resolvers");
const MongoStore = require('connect-mongo')(express_session_1.default);
(() => __awaiter(void 0, void 0, void 0, function* () {
    const app = express_1.default();
    mongoose_1.default.connect(`mongodb://${config_1.config.mongodb.host}:${config_1.config.mongodb.port}/${config_1.config.mongodb.db}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    mongoose_1.default.connection.once('open', () => {
        console.log('connected to database');
    });
    mikroconfig_1.DI.orm = yield mikro_orm_1.MikroORM.init({
        entitiesDirs: ['dist/entity'],
        entitiesDirsTs: ['src/entity'],
        dbName: 'bowie',
        type: 'mongo',
        clientUrl: 'mongodb://localhost:27017',
        logger: console.log.bind(console),
        debug: true,
        autoFlush: true,
        ensureIndexes: true,
    });
    mikroconfig_1.DI.em = mikroconfig_1.DI.orm.em;
    mikroconfig_1.DI.bookRepository = mikroconfig_1.DI.orm.em.getRepository(Book_1.Book);
    mikroconfig_1.DI.userRepos = mikroconfig_1.DI.orm.em.getRepository(entity_1.User);
    mikroconfig_1.DI.eventRepos = mikroconfig_1.DI.orm.em.getRepository(entity_1.Event);
    mikroconfig_1.DI.eventTagRepos = mikroconfig_1.DI.orm.em.getRepository(entity_1.EventTag);
    app.use(express_session_1.default({
        store: new MongoStore({
            mongooseConnection: mongoose_1.default.connection,
        }),
        name: 'qid',
        secret: process.env.SESSION_SECRET || 'aslkdfjoiq12312',
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 1000 * 60 * 60 * 24 * 7 * 365,
        },
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [resolvers_1.AuthResolver, resolvers_1.BookResolver, resolvers_1.EventResolver, resolvers_1.EventTagResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({ req, res }),
        introspection: true,
        playground: true,
    });
    apolloServer.applyMiddleware({ app, cors: false });
    app.listen(config_1.config.express.port, (err) => {
        if (err)
            return console.error(err);
        return console.log(`server is listening on http:localhost:${config_1.config.express.port}/graphql`);
    });
}))();
//# sourceMappingURL=index.js.map