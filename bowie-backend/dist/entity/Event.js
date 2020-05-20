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
let Information = class Information {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Information.prototype, "eventName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Information.prototype, "description", void 0);
Information = __decorate([
    type_graphql_1.ObjectType(),
    type_graphql_1.InputType('EventInformationInput')
], Information);
exports.Information = Information;
var MemberInfoType;
(function (MemberInfoType) {
    MemberInfoType[MemberInfoType["secret"] = 0] = "secret";
    MemberInfoType[MemberInfoType["public"] = 1] = "public";
})(MemberInfoType = exports.MemberInfoType || (exports.MemberInfoType = {}));
let MemberInfo = class MemberInfo {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], MemberInfo.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field({ description: 'secret or public' }),
    __metadata("design:type", Number)
], MemberInfo.prototype, "type", void 0);
MemberInfo = __decorate([
    type_graphql_1.ObjectType(),
    type_graphql_1.InputType('EventMemberInfoInput')
], MemberInfo);
exports.MemberInfo = MemberInfo;
let Coord = class Coord {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], Coord.prototype, "longitude", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], Coord.prototype, "latitude", void 0);
Coord = __decorate([
    type_graphql_1.ObjectType(),
    type_graphql_1.InputType('CoordInput')
], Coord);
exports.Coord = Coord;
let Place = class Place {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Place.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Coord)
], Place.prototype, "coord", void 0);
Place = __decorate([
    type_graphql_1.ObjectType(),
    type_graphql_1.InputType('EventPlaceInput')
], Place);
exports.Place = Place;
let Event = class Event extends BaseEntity_1.BaseEntity {
};
__decorate([
    mikro_orm_1.Property(),
    __metadata("design:type", Object)
], Event.prototype, "metaObject", void 0);
__decorate([
    mikro_orm_1.Property(),
    __metadata("design:type", Array)
], Event.prototype, "metaArray", void 0);
__decorate([
    mikro_orm_1.Property(),
    __metadata("design:type", Array)
], Event.prototype, "metaArrayOfStrings", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    mikro_orm_1.Property(),
    __metadata("design:type", String)
], Event.prototype, "hostId", void 0);
__decorate([
    type_graphql_1.Field(() => MemberInfo),
    mikro_orm_1.Property(),
    __metadata("design:type", Array)
], Event.prototype, "membersInfo", void 0);
__decorate([
    type_graphql_1.Field(),
    mikro_orm_1.Property(),
    __metadata("design:type", Date)
], Event.prototype, "time", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    mikro_orm_1.Property(),
    __metadata("design:type", Array)
], Event.prototype, "tags", void 0);
__decorate([
    type_graphql_1.Field(),
    mikro_orm_1.Property(),
    __metadata("design:type", Place)
], Event.prototype, "place", void 0);
__decorate([
    type_graphql_1.Field(),
    mikro_orm_1.Property(),
    __metadata("design:type", Information)
], Event.prototype, "information", void 0);
Event = __decorate([
    type_graphql_1.ObjectType(),
    type_graphql_1.InputType('EventCreateInput'),
    mikro_orm_1.Entity()
], Event);
exports.Event = Event;
//# sourceMappingURL=Event.js.map