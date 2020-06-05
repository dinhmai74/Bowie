import { ThemeStoreModel, ThemeStore } from "./theme-store"

test("can be created", () => {
  const instance: ThemeStore = ThemeStoreModel.create({})

  expect(instance).toBeTruthy()
})
