const Danceform = require("../models/danceform.model");
const Registration = require("../models/registration.model");

async function getDanceforms(req, res, next) {
  try {
    const danceforms = await Danceform.findAll();
    res.render("admin/danceforms/all-danceforms", { danceforms: danceforms });
  } catch (error) {
    next(error);
    return;
  }
}

function getNewDanceform(req, res) {
  res.render("admin/danceforms/new-danceform");
}

async function createNewDanceform(req, res, next) {
  const danceform = new Danceform({
    ...req.body,
    image: req.file.filename,
  });

  try {
    await danceform.save();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect("/admin/danceforms");
}

async function getUpdateDanceform(req, res, next) {
  try {
    const danceform = await Danceform.findById(req.params.id);
    res.render("admin/danceforms/update-danceform", { danceform: danceform });
  } catch (error) {
    next(error);
  }
}

async function updateDanceform(req, res, next) {
  const danceform = new Danceform({
    ...req.body,
    _id: req.params.id,
  });

  if (req.file) {
    danceform.replaceImage(req.file.filename);
  }

  try {
    await danceform.save();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect("/admin/danceforms");
}

async function deleteDanceform(req, res, next) {
  let danceform;
  try {
    danceform = await Danceform.findById(req.params.id);
    await danceform.remove();
  } catch (error) {
    return next(error);
  }

  res.json({ message: "Deleted danceform!" });
}

async function getRegistrations(req, res, next) {
  try {
    const registrations = await Registration.findAll();
    res.render("admin/registrations/admin-registrations", {
      registrations: registrations,
    });
  } catch (error) {
    next(error);
  }
}

async function updateRegistration(req, res, next) {
  const registrationId = req.params.id;
  const newStatus = req.body.newStatus;

  try {
    const registration = await Registration.findById(registrationId);

    registration.status = newStatus;

    await registration.save();

    res.json({ message: "Registration updated", newStatus: newStatus });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getDanceforms: getDanceforms,
  getNewDanceform: getNewDanceform,
  createNewDanceform: createNewDanceform,
  getUpdateDanceform: getUpdateDanceform,
  updateDanceform: updateDanceform,
  deleteDanceform: deleteDanceform,
  getRegistrations: getRegistrations,
  updateRegistration: updateRegistration,
};
