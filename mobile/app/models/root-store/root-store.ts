import { ThemeStoreModel } from '../../models/theme-store'
import { UserInfoStoreModel } from '../../models/user-info-store'
import { Instance, SnapshotOut, types } from 'mobx-state-tree'

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  themeStore: types.optional(ThemeStoreModel, {
    theme: "light"
  }),
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
