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
let Book = class Book extends BaseEntity_1.BaseEntity {
    constructor(title) {
        super();
        this.title = title;
    }
};
__decorate([
    type_graphql_1.Field(),
    mikro_orm_1.Property(),
    __metadata("design:type", String)
], Book.prototype, "title", void 0);
__decorate([
    mikro_orm_1.Property(),
    __metadata("design:type", Object)
], Book.prototype, "metaObject", void 0);
__decorate([
    mikro_orm_1.Property(),
    __metadata("design:type", Array)
], Book.prototype, "metaArray", void 0);
__decorate([
    mikro_orm_1.Property(),
    __metadata("design:type", Array)
], Book.prototype, "metaArrayOfStrings", void 0);
Book = __decorate([
    mikro_orm_1.Entity(),
    type_graphql_1.ObjectType(),
    __metadata("design:paramtypes", [String])
], Book);
exports.Book = Book;
//# sourceMappingURL=Book.js.map