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
const type_graphql_1 = require("type-graphql");
const BaseEntity_1 = require("./BaseEntity");
let Tag = class Tag extends BaseEntity_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(),
    mikro_orm_1.Property(),
    __metadata("design:type", String)
], Tag.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field({ description: 'Current user use this tag for create event' }),
    mikro_orm_1.Property(),
    __metadata("design:type", Number)
], Tag.prototype, "currentUse", void 0);
Tag = __decorate([
    type_graphql_1.ObjectType(),
    type_graphql_1.InputType('TagInput'),
    mikro_orm_1.Entity()
], Tag);
exports.Tag = Tag;
//# sourceMappingURL=Tag.js.map