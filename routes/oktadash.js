const express = require('express')
const router = express.Router()

/* GET team page. */
router.get('/oktadash', function (req, res, next) {
  res.render('oktadash', {
      title, 
      layout: "dashMain",
      user: req.user
    }) 
})

module.exports = router