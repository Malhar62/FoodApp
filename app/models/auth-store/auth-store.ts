import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const AuthStoreModel = types
  .model("AuthStore")
  .props({
    username: types.optional(types.string, ''),
    email: types.optional(types.string, ''),
    password: types.optional(types.string, ''),
    isLogin: types.optional(types.boolean, false),
    method: types.optional(types.string, '')
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    onLogin(name: string, pass: string) {
      self.email = name;
      self.password = pass;
      self.isLogin = true;
      self.method = 'normal'
      self.username = 'Guest'
    },
    onLogout() {
      self.username = '';
      self.password = '';
      self.isLogin = false;
      self.method = '';
      self.email = ''
    },
    onLoginWithFb(mail: any, name: any) {
      self.email = mail;
      self.username = name;
      self.method = mail == '' ? '' : 'facebook';
      self.isLogin = mail == '' ? false : true
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type AuthStoreType = Instance<typeof AuthStoreModel>
export interface AuthStore extends AuthStoreType { }
type AuthStoreSnapshotType = SnapshotOut<typeof AuthStoreModel>
export interface AuthStoreSnapshot extends AuthStoreSnapshotType { }
export const createAuthStoreDefaultModel = () => types.optional(AuthStoreModel, {})
