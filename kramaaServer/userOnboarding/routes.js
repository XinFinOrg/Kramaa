const express = require('express');
const router = express.Router();
var impl = require('./impl');

router.get('/userOnboarding', impl.userOnboarding);
router.post('/userRegistration', impl.userRegistration);
router.post('/userLogin', impl.userLogin);
module.exports = router;
