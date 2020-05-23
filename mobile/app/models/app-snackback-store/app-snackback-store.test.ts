import { AppSnackbackStoreModel, AppSnackbackStore } from "./app-snackback-store"

test("can be created", () => {
  const instance: AppSnackbackStore = AppSnackbackStoreModel.create({})

  expect(instance).toBeTruthy()
})