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
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const mikroconfig_1 = require("../mikroconfig");
const graphql_types_1 = require("../graphql-types");
const entity_1 = require("../entity");
let EventTagResolver = class EventTagResolver {
    getAllTag() {
        return __awaiter(this, void 0, void 0, function* () {
            const eventTags = yield mikroconfig_1.DI.eventTagRepos.findAll();
            return { eventTags };
        });
    }
    createTag({ name }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tag = new entity_1.EventTag();
                tag.name = name;
                tag.currentUse = 0;
                mikroconfig_1.DI.eventTagRepos.persist(tag);
                return {
                    eventTag: tag,
                };
            }
            catch (error) {
                return {
                    errors: [
                        {
                            message: error,
                            path: '',
                        },
                    ],
                };
            }
        });
    }
    changeTagQuantity({ amount, id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const tag = yield mikroconfig_1.DI.eventTagRepos.findOne({ id });
            console.log('tag', tag);
            if (!tag) {
                return {
                    errors: [
                        {
                            message: 'Cannot found id tag',
                            path: 'change tag quantity',
                        },
                    ],
                };
            }
            tag.currentUse = amount;
            mikroconfig_1.DI.eventTagRepos.persist(tag);
            return {
                eventTag: tag,
            };
        });
    }
    IncreaseOrDecreaseTagQuantity(id, increase) {
        return __awaiter(this, void 0, void 0, function* () {
            const tag = yield mikroconfig_1.DI.eventTagRepos.findOne(id);
            if (!tag) {
                return {
                    errors: [
                        {
                            message: 'Cannot found id tag',
                            path: 'change tag quantity',
                        },
                    ],
                };
            }
            tag.currentUse = increase ? tag.currentUse + 1 : tag.currentUse - 1;
            mikroconfig_1.DI.eventTagRepos.persist(tag);
            return {
                eventTag: tag,
            };
        });
    }
};
__decorate([
    type_graphql_1.Query(() => graphql_types_1.EventTagsResponse),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EventTagResolver.prototype, "getAllTag", null);
__decorate([
    type_graphql_1.Mutation(() => graphql_types_1.EventTagResponse),
    __param(0, type_graphql_1.Arg('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entity_1.EventTag]),
    __metadata("design:returntype", Promise)
], EventTagResolver.prototype, "createTag", null);
__decorate([
    type_graphql_1.Mutation(() => graphql_types_1.EventTagResponse),
    __param(0, type_graphql_1.Arg('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [graphql_types_1.ChangeQuantityTagInput]),
    __metadata("design:returntype", Promise)
], EventTagResolver.prototype, "changeTagQuantity", null);
__decorate([
    type_graphql_1.Mutation(() => graphql_types_1.EventTagResponse),
    __param(0, type_graphql_1.Arg('id')),
    __param(1, type_graphql_1.Arg('increase')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", Promise)
], EventTagResolver.prototype, "IncreaseOrDecreaseTagQuantity", null);
EventTagResolver = __decorate([
    type_graphql_1.Resolver()
], EventTagResolver);
exports.EventTagResolver = EventTagResolver;
//# sourceMappingURL=EventTagResolver.js.map