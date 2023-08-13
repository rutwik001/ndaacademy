const mongodb = require('mongodb');

const db = require('../data/database');

class Danceform {
  constructor(danceformData) {
    this.title = danceformData.title;
    this.instructor = danceformData.instructor;
    this.fees = +danceformData.fees;
    this.description = danceformData.description;
    this.image = danceformData.image; // the name of the image file
    this.updateImageData();
    if (danceformData._id) {
      this.id = danceformData._id.toString();
    }
  }

  static async findById(danceformId) {
    let prodId;
    try {
      prodId = new mongodb.ObjectId(danceformId);
    } catch (error) {
      error.code = 404;
      throw error;
    }
    const danceform = await db
      .getDb()
      .collection('danceforms')
      .findOne({ _id: prodId });

    if (!danceform) {
      const error = new Error('Could not find danceform with provided id.');
      error.code = 404;
      throw error;
    }

    return new Danceform(danceform);
  }

  static async findAll() {
    const danceforms = await db.getDb().collection('danceforms').find().toArray();

    return danceforms.map(function (danceformDocument) {
      return new Danceform(danceformDocument);
    });
  }

  static async findMultiple(ids) {
    const danceformIds = ids.map(function(id) {
      return new mongodb.ObjectId(id);
    })
    
    const danceforms = await db
      .getDb()
      .collection('danceforms')
      .find({ _id: { $in: danceformIds } })
      .toArray();

    return danceforms.map(function (danceformDocument) {
      return new Danceform(danceformDocument);
    });
  }

  updateImageData() {
    this.imagePath = `danceform-data/images/${this.image}`;
    this.imageUrl = `/danceforms/assets/images/${this.image}`;
  }

  async save() {
    const danceformData = {
      title: this.title,
      instructor: this.instructor,
      fees: this.fees,
      description: this.description,
      image: this.image,
    };

    if (this.id) {
      const danceformId = new mongodb.ObjectId(this.id);

      if (!this.image) {
        delete danceformData.image;
      }

      await db.getDb().collection('danceforms').updateOne(
        { _id: danceformId },
        {
          $set: danceformData,
        }
      );
    } else {
      await db.getDb().collection('danceforms').insertOne(danceformData);
    }
  }

  replaceImage(newImage) {
    this.image = newImage;
    this.updateImageData();
  }

  remove() {
    const danceformId = new mongodb.ObjectId(this.id);
    return db.getDb().collection('danceforms').deleteOne({ _id: danceformId });
  }
}

module.exports = Danceform;
