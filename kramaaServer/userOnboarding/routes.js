const express = require('express');
const router = express.Router();

router.get('/userOnboarding', (req, res) => {
  var email = req.query.email;
  console.log(email);
});
module.exports = router;
