const express = require('express');

const danceformsController = require('../controllers/danceforms.controller');

const router = express.Router();

router.get('/danceforms', danceformsController.getAllDanceforms);

router.get('/danceforms/:id', danceformsController.getDanceformDetails);

module.exports = router;