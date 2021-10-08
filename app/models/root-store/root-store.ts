import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { NewsStoreModel } from "../news-store/news-store"
import { AuthStoreModel } from "../auth-store/auth-store"
import { CharacterStoreModel } from "../character-store/character-store"
import { FoodStoreModel } from "../food-store/food-store"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  characterStore: types.optional(CharacterStoreModel, {} as any),
  foodStore: types.optional(FoodStoreModel, {} as any),
  authStore: types.optional(AuthStoreModel,{} as any),
  newsStore:types.optional(NewsStoreModel,{} as any)
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> { }

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> { }
