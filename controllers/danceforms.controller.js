const Danceform = require('../models/danceform.model');

async function getAllDanceforms(req, res, next) {
  try {
    const danceforms = await Danceform.findAll();
    res.render('customer/danceforms/all-danceforms', { danceforms: danceforms });
  } catch (error) {
    next(error);
  }
}

async function getDanceformDetails(req, res, next) {
  try {
    const danceform = await Danceform.findById(req.params.id);
    res.render('customer/danceforms/danceform-details', { danceform: danceform });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllDanceforms: getAllDanceforms,
  getDanceformDetails: getDanceformDetails
};
