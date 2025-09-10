import TokenModel from '../models/token';
import BaseRepository from "./baseRepository";

export default class TokenRepository extends BaseRepository {
  constructor() {
    super(TokenModel)
  }

}