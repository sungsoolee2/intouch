const express = require('express')
const router = express.Router()

/* GET team page. */
router.get('/faq', function (req, res, next) {
  res.render('faq', {
      title, 
      layout: "main",
      user: req.user
    }) 
})

module.exports = router