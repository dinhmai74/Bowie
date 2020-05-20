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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const FieldError_1 = require("./FieldError");
const Tag_1 = require("../entity/Tag");
let TagResponse = class TagResponse {
};
__decorate([
    type_graphql_1.Field(() => Tag_1.Tag, { nullable: true }),
    __metadata("design:type", typeof (_a = typeof Tag_1.Tag !== "undefined" && Tag_1.Tag) === "function" ? _a : Object)
], TagResponse.prototype, "tag", void 0);
__decorate([
    type_graphql_1.Field(() => [FieldError_1.FieldError], { nullable: true }),
    __metadata("design:type", Array)
], TagResponse.prototype, "errors", void 0);
TagResponse = __decorate([
    type_graphql_1.ObjectType()
], TagResponse);
exports.TagResponse = TagResponse;
let TagsResponse = class TagsResponse {
};
__decorate([
    type_graphql_1.Field(() => [Tag_1.Tag], { nullable: true }),
    __metadata("design:type", Array)
], TagsResponse.prototype, "tags", void 0);
__decorate([
    type_graphql_1.Field(() => [FieldError_1.FieldError], { nullable: true }),
    __metadata("design:type", Array)
], TagsResponse.prototype, "errors", void 0);
TagsResponse = __decorate([
    type_graphql_1.ObjectType()
], TagsResponse);
exports.TagsResponse = TagsResponse;
//# sourceMappingURL=TagResponse.js.map