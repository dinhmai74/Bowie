"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const type_graphql_1 = require("type-graphql");
const entity_1 = require("../entity");
const graphql_types_1 = require("../graphql-types");
const mikroconfig_1 = require("../mikroconfig");
const invalidLoginResponse = {
    errors: [
        {
            path: 'email',
            message: 'invalid login',
        },
    ],
};
let AuthResolver = class AuthResolver {
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield mikroconfig_1.DI.em.find(entity_1.User, {});
            return { users };
        });
    }
    register({ email, password, name }, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
            const existingUser = yield mikroconfig_1.DI.userRepos.findOne({ email });
            if (existingUser) {
                return {
                    errors: [
                        {
                            path: 'email',
                            message: 'already in use',
                        },
                    ],
                };
            }
            else {
                const user = new entity_1.User();
                user.password = hashedPassword;
                user.email = email;
                user.name = name;
                mikroconfig_1.DI.userRepos.persist(user);
                console.log('user.id', user);
                ctx.req.session.userId = user.id;
                console.log('ctx.req.session!.userId', ctx.req.session.userId);
                return { user };
            }
        });
    }
    login({ email, password }, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield mikroconfig_1.DI.userRepos.findOne({ email });
            console.log('user', user);
            if (!user) {
                return invalidLoginResponse;
            }
            const valid = yield bcryptjs_1.default.compare(password, user.password);
            if (!valid) {
                return invalidLoginResponse;
            }
            ctx.req.session.userId = user.id;
            return { user };
        });
    }
    auth(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!ctx.req.session.userId) {
                return undefined;
            }
            const user = yield mikroconfig_1.DI.userRepos.findOne({ id: ctx.req.session.userId });
            return user || undefined;
        });
    }
    me(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('ctx.req.session!.userId', ctx.req.session.userId);
            if (!ctx.req.session.userId) {
                return undefined;
            }
            const user = yield mikroconfig_1.DI.userRepos.findOne({ id: ctx.req.session.userId });
            return user || undefined;
        });
    }
    logout(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((res, rej) => ctx.req.session.destroy((err) => {
                if (err) {
                    console.log(err);
                    return rej(false);
                }
                ctx.res.clearCookie('qid');
                return res(true);
            }));
        });
    }
};
__decorate([
    type_graphql_1.Query(() => graphql_types_1.UsersResponse),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "getAllUsers", null);
__decorate([
    type_graphql_1.Mutation(() => graphql_types_1.UserResponse),
    __param(0, type_graphql_1.Arg('input')),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [graphql_types_1.SignUpInput, Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "register", null);
__decorate([
    type_graphql_1.Mutation(() => graphql_types_1.UserResponse),
    __param(0, type_graphql_1.Arg('input')),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [graphql_types_1.AuthInput, Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "login", null);
__decorate([
    type_graphql_1.Mutation(() => entity_1.User, { nullable: true }),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "auth", null);
__decorate([
    type_graphql_1.Query(() => entity_1.User, { nullable: true }),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "me", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "logout", null);
AuthResolver = __decorate([
    type_graphql_1.Resolver()
], AuthResolver);
exports.AuthResolver = AuthResolver;
//# sourceMappingURL=AuthResolver.js.map