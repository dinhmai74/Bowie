import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const ThemeModel = types
  .model("Theme")
  .props({
    type: types.maybe(types.enumeration(["dark", "light"])),
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    setTheme(theme: any) {
      self.type = theme
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(s => ({
    toggle() {
      if (s.type === "dark") s.setTheme("light")
      else s.setTheme("dark")
    },
  }))

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type ThemeType = Instance<typeof ThemeModel>
export interface Theme extends ThemeType {}
type ThemeSnapshotType = SnapshotOut<typeof ThemeModel>
export interface ThemeSnapshot extends ThemeSnapshotType {}
