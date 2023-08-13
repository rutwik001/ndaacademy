const express = require('express');

const registrationsController = require('../controllers/registrations.controller');

const router = express.Router();

router.post('/', registrationsController.addRegistration); // /registrations

router.get('/', registrationsController.getRegistrations); // /registrations

module.exports = router;