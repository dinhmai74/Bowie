import { AppSnackbackStoreModel } from '../../models/app-snackback-store'
import { Instance, SnapshotOut, types } from 'mobx-state-tree'
import { ThemeModel } from '../theme'

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  appSnackbackStore: types.optional(AppSnackbackStoreModel, {
    isShow: false,
    type: "success",
    expireTime: 2000

  }),
  themeStore: types.optional(ThemeModel, {}),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
