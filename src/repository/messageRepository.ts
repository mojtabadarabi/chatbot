import BaseRepository from "./baseRepository";
import MessageModel from '../models/message'

export default class MessageRepository extends BaseRepository {
  constructor() {
    super(MessageModel)
  }

}