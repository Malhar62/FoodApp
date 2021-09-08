import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { categories, ingredients, recipes } from "./DataArray"

/**
 * Model description here for TypeScript hints.
 */
export const FoodStoreModel = types
  .model("FoodStore")
  .props({
    categories: types.optional(types.array(types.frozen()), []),
    recipes: types.optional(types.array(types.frozen()), []),
    ingredients: types.optional(types.array(types.frozen()), []),
    histories: types.optional(types.array(types.frozen()), []),
    favs: types.optional(types.array(types.frozen()), []),
    viewedfavs: types.optional(types.number, 0)
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setCategory() {
      var array: any = categories
      self.categories = array;
    },
    setIngredient() {
      var array: any = ingredients;
      self.ingredients = array;
    },
    setRecipe() {
      var array: any = recipes;
      self.recipes = array;
    },
    findByCategory(text: string) {
      var array = [];
      var Text = text.toUpperCase();
      self.categories.map(item => {
        if (item.name.toUpperCase().includes(Text)) {
          self.recipes.map(data => {
            if (data.categoryId == item.id) {
              array.push(data)
            }
          })
        }
      })
      return array;
    },
    findByRecipeName(text: string) {
      let array = [];
      var Text = text.toUpperCase();
      self.recipes.map(item => {
        if (item.title.toUpperCase().includes(Text)) {
          array.push(item)
        }
      })
      return array;
    },
    findByIngredient(text: string) {
      let array = [];
      var Text = text.toUpperCase();

      self.ingredients.map(item => {
        if (item.name.toUpperCase().includes(Text)) {
          self.recipes.map(data => {
            data.ingredients.map((product: any[]) => {
              if (product[0] == item.ingredientId) {
                array.push(data)
              }
            })
          })
        }
      })
      return array;
    },
    addToHistory(data: any) {
      self.histories.forEach((item, index) => {
        if (data.title == item.title) {
          self.histories.splice(index, 1)
        }
      })
      self.histories.push(data)
    },
    addToFav(data: any) {
      self.favs.push(data)
    },
    removeFromFavs(id: any) {
      self.favs.splice(id, 1)
    },
    viewingFavs(num: number) {
      self.viewedfavs = num
    }
    // giveValue(text: string, about: string) {
    //   var count = 0;
    //   self.favs.forEach((item, index) => {
    //     if (text == item.title) {
    //       console.log('matched')
    //     } else {
    //       count++;
    //     }
    //   })
    //   // if (count == self.favs.length) {
    //   //   return about == 'icon' ? 'star-o' : 'black'
    //   // } else {
    //   //   return about == 'color' ? 'star' : 'gold'
    //   // }
    //   if (about == 'icon') {
    //     if (count == self.favs.length) {
    //       return 'star-o'
    //     } else {
    //       return 'star'
    //     }
    //   } else {
    //     if (count == self.favs.length) {
    //       return 'black'
    //     } else {
    //       return 'gold'
    //     }
    //   }
    // }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type FoodStoreType = Instance<typeof FoodStoreModel>
export interface FoodStore extends FoodStoreType { }
type FoodStoreSnapshotType = SnapshotOut<typeof FoodStoreModel>
export interface FoodStoreSnapshot extends FoodStoreSnapshotType { }
export const createFoodStoreDefaultModel = () => types.optional(FoodStoreModel, {})
