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
const graphql_types_1 = require("../graphql-types");
const entity_1 = require("../entity");
const mikroconfig_1 = require("../mikroconfig");
const utils_1 = require("../utils");
let EventResolver = class EventResolver {
    getEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            const events = mikroconfig_1.DI.eventRepos.findAll();
            return { events };
        });
    }
    getEventBaseOnPos({ latitude, longitude }) {
        return __awaiter(this, void 0, void 0, function* () {
            const events = yield mikroconfig_1.DI.em.getRepository(entity_1.Event).findAll();
            events.filter((v) => {
                return utils_1.isInArea(v.place.coord.latitude, v.place.coord.longitude, latitude, longitude, 'K');
            });
            return {
                events,
            };
        });
    }
    createEvent({ hostId, time, place, information, membersInfo, tags }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = new entity_1.Event();
                event.time = time;
                event.place = place;
                event.hostId = hostId;
                event.information = information;
                event.membersInfo = membersInfo;
                event.tags = tags;
                mikroconfig_1.DI.eventRepos.persist(event);
                const tagsEntity = yield mikroconfig_1.DI.eventTagRepos.find({
                    id: {
                        $in: tags,
                    },
                });
                tagsEntity.forEach((v) => {
                    v.currentUse += 1;
                    mikroconfig_1.DI.eventTagRepos.persist(v);
                });
                return {
                    event,
                };
            }
            catch (error) {
                return {
                    errors: error,
                };
            }
        });
    }
};
__decorate([
    type_graphql_1.Query(() => graphql_types_1.EventsResponse),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "getEvents", null);
__decorate([
    type_graphql_1.Query(() => graphql_types_1.EventsResponse),
    __param(0, type_graphql_1.Arg('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entity_1.Coord]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "getEventBaseOnPos", null);
__decorate([
    type_graphql_1.Mutation(() => graphql_types_1.EventResponse),
    __param(0, type_graphql_1.Arg('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entity_1.Event]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "createEvent", null);
EventResolver = __decorate([
    type_graphql_1.Resolver()
], EventResolver);
exports.EventResolver = EventResolver;
//# sourceMappingURL=EventResolver.js.map