import { NewsStoreModel } from "./news-store"

test("can be created", () => {
  const instance = NewsStoreModel.create({})

  expect(instance).toBeTruthy()
})
