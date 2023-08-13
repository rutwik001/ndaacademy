const mongodb = require('mongodb');

const db = require('../data/database');

class Registration {
  // Status => Admission in process, registered, declined
  constructor(apply, userData, status = 'Admission in process', date, registrationId) {
    this.danceformData = apply;
    this.userData = userData;
    this.status = status;
    this.date = new Date(date);
    if (this.date) {
      this.formattedDate = this.date.toLocaleDateString('en-US', {
        weekday: 'short',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    }
    this.id = registrationId;
  }

  static transformRegistrationDocument(registrationDoc) {
    return new Registration(
      registrationDoc.danceformData,
      registrationDoc.userData,
      registrationDoc.status,
      registrationDoc.date,
      registrationDoc._id
    );
  }

  static transformRegistrationDocuments(registrationDocs) {
    return registrationDocs.map(this.transformRegistrationDocument);
  }

  static async findAll() {
    const registrations = await db
      .getDb()
      .collection('registrations')
      .find()
      .sort({ _id: -1 })
      .toArray();

    return this.transformRegistrationDocuments(registrations);
  }

  static async findAllForUser(userId) {
    const uid = new mongodb.ObjectId(userId);

    const registrations = await db
      .getDb()
      .collection('registrations')
      .find({ 'userData._id': uid })
      .sort({ _id: -1 })
      .toArray();

    return this.transformRegistrationDocuments(registrations);
  }

  static async findById(registrationId) {
    const registration = await db
      .getDb()
      .collection('registrations')
      .findOne({ _id: new mongodb.ObjectId(registrationId) });

    return this.transformRegistrationDocument(registration);
  }

  save() {
    if (this.id) {
      const registrationId = new mongodb.ObjectId(this.id);
      return db
        .getDb()
        .collection('registrations')
        .updateOne({ _id: registrationId }, { $set: { status: this.status } });
    } else {
      const registrationDocument = {
        userData: this.userData,
        danceformData: this.danceformData,
        date: new Date(),
        status: this.status,
      };

      return db.getDb().collection('registrations').insertOne(registrationDocument);
    }
  }
}

module.exports = Registration;
