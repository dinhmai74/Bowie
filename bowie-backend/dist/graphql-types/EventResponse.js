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
const FieldError_1 = require("./FieldError");
const Event_1 = require("../entity/Event");
let EventResponse = class EventResponse {
};
__decorate([
    type_graphql_1.Field(() => Event_1.Event, { nullable: true }),
    __metadata("design:type", Event_1.Event)
], EventResponse.prototype, "event", void 0);
__decorate([
    type_graphql_1.Field(() => [FieldError_1.FieldError], { nullable: true }),
    __metadata("design:type", Array)
], EventResponse.prototype, "errors", void 0);
EventResponse = __decorate([
    type_graphql_1.ObjectType()
], EventResponse);
exports.EventResponse = EventResponse;
let EventsResponse = class EventsResponse {
};
__decorate([
    type_graphql_1.Field(() => [Event_1.Event], { nullable: true }),
    __metadata("design:type", Array)
], EventsResponse.prototype, "events", void 0);
__decorate([
    type_graphql_1.Field(() => [FieldError_1.FieldError], { nullable: true }),
    __metadata("design:type", Array)
], EventsResponse.prototype, "errors", void 0);
EventsResponse = __decorate([
    type_graphql_1.ObjectType()
], EventsResponse);
exports.EventsResponse = EventsResponse;
//# sourceMappingURL=EventResponse.js.map