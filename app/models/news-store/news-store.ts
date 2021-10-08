import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"

/**
 * Model description here for TypeScript hints.
 */
export const NewsStoreModel = types
  .model("NewsStore")
  .props({
    news: types.optional(types.array(types.frozen()), []),
    theme: types.optional(types.boolean, false),
    isLoading: types.optional(types.boolean, false)
  })
  .views((self) => ({}))
  .extend(withEnvironment)// eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    getNewsFromStore: flow(function* getNewsFromStore(category: string) {
      try {
        self.isLoading = true;
        const res = yield self.environment.api.getNews(category);
        if (res.kind === "ok" && res.status == 200) {
          self.isLoading = false;
          self.news = res.list
          return { response: true, message: "Success." };
        }
        else {
          self.isLoading = false;
          return { response: false, message: "Something went wrong." };
        }
      } catch (error) {
        self.isLoading = false;
        return { response: false, message: "Something went wrong." };
      }
    }),
    changeMode() {
      console.log('Richard mille')
    },
    getNJason: flow(function* getNJason() {
      try {
        const res = yield self.environment.api.getJason();
        if (res.kind === "ok" && res.status == 200) {
          self.news = res.list
          console.log(res.list)
          return { response: true, message: "Success." };
        }
        else {
          self.isLoading = false;
          return { response: false, message: "Something went wrong." };
        }
      } catch (error) {
        self.isLoading = false;
        return { response: false, message: "Something went wrong." };
      }
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type NewsStoreType = Instance<typeof NewsStoreModel>
export interface NewsStore extends NewsStoreType { }
type NewsStoreSnapshotType = SnapshotOut<typeof NewsStoreModel>
export interface NewsStoreSnapshot extends NewsStoreSnapshotType { }
export const createNewsStoreDefaultModel = () => types.optional(NewsStoreModel, {})
