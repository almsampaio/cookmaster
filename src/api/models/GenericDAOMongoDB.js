const { ObjectId } = require('mongodb');
const connection = require('../database/connection');

const getDBCollection = async (nameCollection) => connection()
  .then((db) => db.collection(nameCollection));

class GenericDAOMongoDB {
  constructor(nameCollection) {
    this.nameCollection = nameCollection;
    this.collection = getDBCollection(nameCollection);
  }

  async createCounter() {
    try {
      const db = await connection();
      if (await db.collection('counters').countDocuments({ _id: this.nameCollection })) {
        return console.log(`The counter "${this.nameCollection}" already exists.`);
      }

      await db.collection('counters').insertOne({ _id: this.nameCollection, autoIncrement: 1 });
      console.log(`The counter "${this.nameCollection}" was created`);
    } catch (err) {
      console.error(err);
    }
  }

  async getNextSequenceId() {
    const db = await connection();

    const { value } = await db.collection('counters').findOneAndUpdate(
      { _id: this.nameCollection },
      { $inc: { autoIncrement: 1 } },
    );

    if (value === null) {
      await this.createCounter();
      const { value: { autoIncrement } } = await db.collection('counters').findOneAndUpdate(
        { _id: this.nameCollection },
        { $inc: { autoIncrement: 1 } },
      );
      return autoIncrement;
    }
    
    return value.autoIncrement;
  }

  async aggregate(pipeline) {
    return (await this.collection).aggregate(pipeline).toArray();
  }

  async deleteById(id) {
    return (await this.collection).deleteOne({ id });
  }

  async deleteByObjectId(_id) {
    return (await this.collection).deleteOne({ _id: ObjectId(_id) });
  }

  async deleteOneByQuery(query) {
    return (await this.collection).deleteOne(query);
  }

  async deleteByQuery(query) {
    return (await this.collection).deleteMany(query);
  }

  async findByColumn({ nameColumn = 'name', query }, options = {}) {
    return (await this.collection).find({ [nameColumn]: query }, options).toArray();
  }

  async findByObjectId(_id, options = {}) {
    return (await this.collection).findOne({ _id: ObjectId(_id) }, options);
  }

  async findById(id, options = {}) {
    return (await this.collection).findOne({ id }, options);
  }

  async findOneByQuery(query, options = {}) {
    return (await this.collection).findOne(query, options);
  }

  async findAndDeleteById(id) {
    return (await this.collection).findOneAndDelete({ id });
  }

  async findAndDeleteByQuery(query) {
    return (await this.collection).findOneAndDelete(query);
  }

  async findAndDeleteByObjectId(_id) {
    return (await this.collection).findOneAndDelete({ _id: ObjectId(_id) });
  }

  async findAndUpdateById(id, data, options = { returnOriginal: false }) {
    return (await this.collection).findOneAndUpdate({ id }, { $set: { ...data } }, options);
  }

  async findAndUpdateByObjectId(_id, data, options = { returnOriginal: false }) {
    return (await this.collection)
      .findOneAndUpdate({ _id: ObjectId(_id) }, { $set: { ...data } }, options);
  }

  async findAndUpdateByQuery(query, update, options = { returnOriginal: false }) {
    return (await this.collection).findOneAndUpdate(query, { $set: { ...update } }, options);
  }

  async findAndUpdateByObjectIdNoSet(_id, expr, options = { returnOriginal: false }) {
    return (await this.collection).findOneAndUpdate({ _id: ObjectId(_id) }, expr, options);
  }

  async getAll(options = {}) {
    return (await this.collection).find({}, options).toArray();
  }

  async getAllSkipAndLimit(skip, limit) {
    return (await this.collection).find({}).skip(skip).limit(limit).toArray();
  }

  async insertOne(data) {
    return (await this.collection).insertOne({ id: await this.getNextSequenceId(), ...data });
  }

  async updateOne(_id, data) {
    return (await this.collection).updateOne({ _id: ObjectId(_id) }, { $set: { ...data } });
  }
}

module.exports = GenericDAOMongoDB;
