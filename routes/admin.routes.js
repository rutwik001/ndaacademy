const express = require('express');

const adminController = require('../controllers/admin.controller');
const imageUploadMiddleware = require('../middlewares/image-upload');

const router = express.Router();

router.get('/danceforms', adminController.getDanceforms); // /admin/danceforms

router.get('/danceforms/new', adminController.getNewDanceform);

router.post('/danceforms', imageUploadMiddleware, adminController.createNewDanceform);

router.get('/danceforms/:id', adminController.getUpdateDanceform);

router.post('/danceforms/:id', imageUploadMiddleware, adminController.updateDanceform);

router.delete('/danceforms/:id', adminController.deleteDanceform);

router.get('/registrations', adminController.getRegistrations);

router.patch('/registrations/:id', adminController.updateRegistration);

module.exports = router;