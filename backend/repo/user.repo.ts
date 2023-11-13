import { BaseRepo } from "./base.repo";
import { IUser, users } from './data';

export class UserRepo extends BaseRepo<IUser> {

     constructor() {
          super(users);
     }

     async createUser(username: string) {
          const user = {
               id: this._data.length + 1,
               username,
               companyIds: []
          }
          this._data.push(user)
          return Promise.resolve(user)
     }

}