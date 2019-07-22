const okta = require('@okta/okta-sdk-nodejs')
const express = require('express')

const router = express.Router()

const client = new okta.Client({
  orgUrl: process.env.OKTA_ORG_URL,
  token: process.env.REGISTRATION_TOKEN,
})

const title = 'Create an account'

router.get('/', (req, res, next) => {
  if (req.userinfo) {
    return res.redirect('/')
  }
  console.log("Userinfo"+req.userinfo);

  res.render('register', { title, layout: "dashMain" })
  // return res.redirect('/register');
  console.log("REGISTER PAGE");
})

router.post('/', async (req, res, next) => {
  try {
    await client.createUser({
      profile: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        login: req.body.email,
      },
      credentials: {
        password: {
          value: req.body.password,
        },
      },
    }).catch()
    // }).then(function(){
    //   console.log("loading up that promise boss");
    //   console.log(req.body.childemail);
    // })

  console.log("We made a user with "+req.body);
    res.redirect('/dashboard')
  } catch ({ errorCauses }) {
    const errors = errorCauses.reduce((summary, { errorSummary }) => {
      if (/Password/.test(errorSummary)) {
        return Object.assign({ password: errorSummary })
      }

      const [ field, error ] = /^(.+?): (.+)$/.exec(errorSummary)
      return Object.assign({ [field]: error }, summary)
    }, {})

    console.log(errors)

    res.render('register', { title, errors, body: req.body, layout: "dashMain" })
  }
})

function handleRedirect(req, res, targetBaseUrl) {
  const targetUrl = targetBaseUrl;
  res.redirect(targetUrl);
}

// router.post('/register', function(req,res,next){
//     if(req.body.Email == Email && req.body.password == password){
//          res.redirect('/welcome'); // Redirect to /welcome if success
//     }
//     else {
//          res.redirect('/login'); // Redirect to /login if login fail
//     }

// });

module.exports = router