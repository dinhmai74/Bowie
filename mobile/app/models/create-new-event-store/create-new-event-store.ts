import { Instance, SnapshotOut, types } from 'mobx-state-tree'
import { Moment } from 'moment'

const CoordModel = types.model({
  longitude: types.number,
  latitude: types.number,
})

const PlaceModel = types.model({
  name: types.string,
  address: types.string,
  coord: types.maybe(CoordModel),
})

const InformationModel = types.model({
  eventName: types.string,
  description: types.string,
})

/**
 * Model description here for TypeScript hints.
 */
export const CreateNewEventStoreModel = types
  .model('CreateNewEventStore')
  .props({
    place: types.maybe(PlaceModel),
    information: types.maybe(InformationModel),
    tags: types.optional(types.array(types.string), []),
    startTime: types.maybe(types.string),
    endTime: types.maybe(types.string),
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    reset() {
      self.place = undefined
      self.information = undefined
      self.tags = undefined
    },
    setPlaceInfo(latitude: number, longitude: number, title: string) {
      self.place = {
        name: title || '',
        address: self.place?.address || '',
        coord: {
          latitude,
          longitude,
        },
      }
    },
    setEventTime(start: Moment, end: Moment) {
      self.startTime = start.format()
      self.endTime = end.format()
    },
    setTags(v: any) {
      self.tags = v
    },
    setEventInfo(name: string, des: string) {
      self.information = {
        description: des,
        eventName: name,
      }
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type CreateNewEventStoreType = Instance<typeof CreateNewEventStoreModel>
export interface CreateNewEventStore extends CreateNewEventStoreType {}
type CreateNewEventStoreSnapshotType = SnapshotOut<typeof CreateNewEventStoreModel>
export interface CreateNewEventStoreSnapshot extends CreateNewEventStoreSnapshotType {}
