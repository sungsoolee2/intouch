const express = require('express')
const router = express.Router()

/* GET team page. */
router.get('/team', function (req, res, next) {
  res.render('team', {
      title, 
      layout: "teamMain",
      user: req.user
    }) 
})

module.exports = router