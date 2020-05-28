import { UserInfoStoreModel, UserInfoStore } from "./user-info-store"

test("can be created", () => {
  const instance: UserInfoStore = UserInfoStoreModel.create({})

  expect(instance).toBeTruthy()
})