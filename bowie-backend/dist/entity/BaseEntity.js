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
Object.defineProperty(exports, "__esModule", { value: true });
const mikro_orm_1 = require("mikro-orm");
const mongodb_1 = require("mongodb");
const type_graphql_1 = require("type-graphql");
let BaseEntity = class BaseEntity {
    constructor() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
};
__decorate([
    mikro_orm_1.PrimaryKey(),
    __metadata("design:type", mongodb_1.ObjectID)
], BaseEntity.prototype, "_id", void 0);
__decorate([
    mikro_orm_1.SerializedPrimaryKey(),
    type_graphql_1.Field(),
    __metadata("design:type", String)
], BaseEntity.prototype, "id", void 0);
__decorate([
    mikro_orm_1.Property(),
    type_graphql_1.Field(() => Date),
    __metadata("design:type", Object)
], BaseEntity.prototype, "createdAt", void 0);
__decorate([
    mikro_orm_1.Property({ onUpdate: () => new Date() }),
    type_graphql_1.Field(() => Date),
    __metadata("design:type", Object)
], BaseEntity.prototype, "updatedAt", void 0);
BaseEntity = __decorate([
    type_graphql_1.ObjectType()
], BaseEntity);
exports.BaseEntity = BaseEntity;
//# sourceMappingURL=BaseEntity.js.map