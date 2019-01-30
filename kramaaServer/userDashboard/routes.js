const express = require('express');
const router = express.Router();
var impl = require('./impl');
var db = require('../database/models/index');
var Client = db.client;
const jwt = require('jsonwebtoken');
var configAuth = require('../config');

router.post('/getUserInfo',isLoggedIn, impl.getUserInfo);
router.post('/projectList',isLoggedIn, impl.projectList);
router.post('/getCounts',isLoggedIn, impl.getCounts);
router.post('/createProject', isLoggedIn, impl.createProject);
router.post('/createThing', isLoggedIn, impl.createThing);
router.post('/inviteColleague', isLoggedIn, impl.inviteColleague);

module.exports = router;

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  var token = req.body.clientToken;
  // JWT enabled login strategy for end user
  jwt.verify(token, configAuth.jwtAuthKey.secret, function (err, decoded) {
    if (err) {
      console.log(err);
      return res.send({ status: false, message: "please login again" })
    } else {
      Client.findOne({
        where: {
          uniqueId: decoded.clientId
        }
      }).then(client => {
        req.client = client;
        next();
      });
    }
  });

}
