import BaseRepository from "./baseRepository";
import UserModel from '../models/user'

export default class UserRepository extends BaseRepository {
  constructor() {
    super(UserModel)
  }

}