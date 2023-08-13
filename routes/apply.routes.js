const express = require('express');

const applyController = require('../controllers/apply.controller');

const router = express.Router();

router.get('/', applyController.getApply); // /apply/

router.post('/items', applyController.addApplyItem); // /apply/items

router.patch('/items', applyController.updateApplyItem);

module.exports = router;