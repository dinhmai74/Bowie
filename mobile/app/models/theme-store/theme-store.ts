import { Instance, SnapshotOut, types } from 'mobx-state-tree'

/**
 * Model description here for TypeScript hints.
 */
export const ThemeStoreModel = types
  .model('ThemeStore')
  .props({
    theme: types.string,
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    setTheme(theme: string) {
      self.theme = theme
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type ThemeStoreType = Instance<typeof ThemeStoreModel>
export interface ThemeStore extends ThemeStoreType {}
type ThemeStoreSnapshotType = SnapshotOut<typeof ThemeStoreModel>
export interface ThemeStoreSnapshot extends ThemeStoreSnapshotType {}
