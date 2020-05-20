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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const entity_1 = require("../entity");
const graphql_types_1 = require("../graphql-types");
let TagResolver = class TagResolver {
    getAllTag() {
        return __awaiter(this, void 0, void 0, function* () {
            const manager = typeorm_1.getMongoRepository(entity_1.Tag);
            const tags = yield manager.find();
            return { tags };
        });
    }
    createTag({ name }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const manager = typeorm_1.getMongoManager();
                const tag = new entity_1.Tag();
                tag.name = name;
                tag.currentUse = 0;
                manager.save(tag);
                return {
                    tag,
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
            const manager = typeorm_1.getMongoRepository(entity_1.Tag);
            const tag = yield manager.findOne(id);
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
            tag.save();
            return {
                tag,
            };
        });
    }
    IncreaseOrDecreaseTagQuantity(id, increase) {
        return __awaiter(this, void 0, void 0, function* () {
            const manager = typeorm_1.getMongoRepository(entity_1.Tag);
            const tag = yield manager.findOne(id);
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
            tag.save();
            return {
                tag,
            };
        });
    }
};
__decorate([
    type_graphql_1.Query(() => graphql_types_1.TagsResponse),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TagResolver.prototype, "getAllTag", null);
__decorate([
    type_graphql_1.Mutation(() => graphql_types_1.TagResponse),
    __param(0, type_graphql_1.Arg('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof entity_1.Tag !== "undefined" && entity_1.Tag) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], TagResolver.prototype, "createTag", null);
__decorate([
    type_graphql_1.Mutation(() => graphql_types_1.TagResponse),
    __param(0, type_graphql_1.Arg('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof graphql_types_1.ChangeQuantityTagInput !== "undefined" && graphql_types_1.ChangeQuantityTagInput) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], TagResolver.prototype, "changeTagQuantity", null);
__decorate([
    type_graphql_1.Mutation(() => graphql_types_1.TagResponse),
    __param(0, type_graphql_1.Arg('id')),
    __param(1, type_graphql_1.Arg('increase')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", Promise)
], TagResolver.prototype, "IncreaseOrDecreaseTagQuantity", null);
TagResolver = __decorate([
    type_graphql_1.Resolver()
], TagResolver);
exports.TagResolver = TagResolver;
//# sourceMappingURL=TagResolver.js.map