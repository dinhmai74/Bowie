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
const type_graphql_1 = require("type-graphql");
const Book_1 = require("../entity/Book");
const FieldError_1 = require("./FieldError");
let BooksResponse = class BooksResponse {
};
__decorate([
    type_graphql_1.Field(() => [Book_1.Book], { nullable: true }),
    __metadata("design:type", Array)
], BooksResponse.prototype, "books", void 0);
__decorate([
    type_graphql_1.Field(() => [FieldError_1.FieldError], { nullable: true }),
    __metadata("design:type", Array)
], BooksResponse.prototype, "errors", void 0);
BooksResponse = __decorate([
    type_graphql_1.ObjectType()
], BooksResponse);
exports.BooksResponse = BooksResponse;
//# sourceMappingURL=BookResponse.js.map