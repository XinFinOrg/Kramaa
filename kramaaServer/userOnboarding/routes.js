const express = require('express');
const router = express.Router();
var impl = require('./impl');

router.post('/userOnboarding', impl.userOnboarding);
router.post('/userRegistration', impl.userRegistration);
router.post('/inviteUserRegistration', impl.inviteUserRegistration);
router.post('/invitedUserInfo', impl.invitedUserInfo);
router.post('/userLogin', impl.userLogin);
router.post('/verifyOTP', impl.verifyOTP);
module.exports = router;
