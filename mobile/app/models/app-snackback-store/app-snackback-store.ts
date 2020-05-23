import { Instance, SnapshotOut, types, flow } from 'mobx-state-tree'
import { nDelay } from 'utils'

/**
 * Model description here for TypeScript hints.
 */
export const AppSnackbackStoreModel = types
  .model('AppSnackbackStore')
  .props({
    isShow: types.boolean,
    type: types.enumeration(['warning', 'info', 'error', 'success']),
    message: types.optional(types.string, ''),
    expireTime: types.number,
  })
  .views(self => ({}))
  .actions(self => ({
    reset() {
      self.isShow = false
      self.message = ''
      self.type = 'success'
    },
  }))
  .actions(self => ({
    show: flow(function* show(message, type) {
      self.message = message
      if (type) self.type = type
      self.isShow = true
      yield nDelay(self.expireTime)
      self.reset()
    }),
  }))
  .actions(self => ({
    close() {
      self.isShow = false
    },
  }))

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type AppSnackbackStoreType = Instance<typeof AppSnackbackStoreModel>
export interface AppSnackbackStore extends AppSnackbackStoreType {}
type AppSnackbackStoreSnapshotType = SnapshotOut<typeof AppSnackbackStoreModel>
export interface AppSnackbackStoreSnapshot extends AppSnackbackStoreSnapshotType {}
