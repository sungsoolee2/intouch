const express = require('express')
const router = express.Router()

/* GET team page. */
router.get('/landing', function (req, res, next) {
  res.render('landing', {
      title, 
      layout: "dashMain",
      user: req.user
    }) 
})

module.exports = router