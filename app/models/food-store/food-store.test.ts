import { FoodStoreModel } from "./food-store"

test("can be created", () => {
  const instance = FoodStoreModel.create({})

  expect(instance).toBeTruthy()
})
