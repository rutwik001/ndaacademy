const Registration = require('../models/registration.model');
const User = require('../models/user.model');

async function getRegistrations(req, res) {
  try {
    const registrations = await Registration.findAllForUser(res.locals.uid);
    res.render('customer/registrations/all-registrations', {
      registrations: registrations
    });
  } catch (error) {
    next(error);
  }
}

async function addRegistration(req, res, next) {
  const apply = res.locals.apply;

  let userDocument;
  try {
    userDocument = await User.findById(res.locals.uid);
  } catch (error) {
    return next(error);
  }

  const registration = new Registration(apply, userDocument);

  try {
    await registration.save();
  } catch (error) {
    next(error);
    return;
  }

  req.session.apply = null;

  res.redirect('/registrations');
}

module.exports = {
  addRegistration: addRegistration,
  getRegistrations: getRegistrations,
};
