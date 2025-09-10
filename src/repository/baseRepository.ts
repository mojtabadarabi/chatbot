export default class BaseRepository {
  model: any;
  constructor(model:any) {
    //@ts-ignore
    this.model = model;
  }

  async create(data:any) {
    return this.model.create(data);
  }

  async findById(id:any) {
    return this.model.findById(id);
  }

  find(condition:any) {
    return this.model.find(condition);
  }

  async findOne(conditions:any) {
    return this.model.findOne(conditions);
  }

  async update(id:any, data:any) {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteOne(conditions:any) {
    return this.model.deleteOne(conditions);
  }
}