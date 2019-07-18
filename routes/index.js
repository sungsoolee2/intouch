const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Node User Authentication',
    userinfo: req.userinfo,
   });
});

module.exports = router;
