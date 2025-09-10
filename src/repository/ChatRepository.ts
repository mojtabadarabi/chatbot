import ChatModel from '../models/chat';
import BaseRepository from "./baseRepository";

export default class ChatRepository extends BaseRepository {
  constructor() {
    super(ChatModel)
  }

  async addToMessagesById(id: any, messages: string[]) {
    return this.model.findByIdAndUpdate(id, { $push: { messages: messages } }, { new: true });
  }

}