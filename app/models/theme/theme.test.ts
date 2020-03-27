import { ThemeModel, Theme } from "./theme"

test("can be created", () => {
  const instance: Theme = ThemeModel.create({})

  expect(instance).toBeTruthy()
})