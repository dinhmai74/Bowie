import { Instance, SnapshotOut, types } from 'mobx-state-tree'

/**
 * Model description here for TypeScript hints.
 */
export const UserInfoStoreModel = types
  .model('UserInfoStore')
  .props({
    id: types.optional(types.string, ''),
    name: types.optional(types.string, ''),
    email: types.optional(types.string, ''),
    avatar: types.optional(types.string, ''),
    isLogin: types.optional(types.boolean, false),
  })
  .actions(self => ({
    setInfo({ email, name, avt, id }) {
      self.email = email
      self.name = name
      self.avatar = avt
      self.id = id
    },

    setEmail(email: string) {
      self.email = email
    },

    setName(name: string) {
      self.name = name
    },

    setAvatar(avt: string) {
      self.avatar = avt
    },
    clear() {
      self.avatar = ''
      self.email = ''
      self.name = ''
    },
  }))

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type UserInfoStoreType = Instance<typeof UserInfoStoreModel>
export interface UserInfoStore extends UserInfoStoreType {}
type UserInfoStoreSnapshotType = SnapshotOut<typeof UserInfoStoreModel>
export interface UserInfoStoreSnapshot extends UserInfoStoreSnapshotType {}
