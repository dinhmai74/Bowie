import { CreateNewEventStoreModel } from '../../models/create-new-event-store'
import { UserInfoStoreModel } from '../../models/user-info-store'
import { Instance, SnapshotOut, types } from 'mobx-state-tree'

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  createNewEventStore: types.optional(CreateNewEventStoreModel, {}),
  userInfoStore: types.optional(UserInfoStoreModel, {}),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
