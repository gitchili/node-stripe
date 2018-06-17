// App entry point
const express = require('express');
// see stripe API and keys.js
const keys = require('./config/keys');
// stripe documation to find api PRV_KEY
const stripe = require('stripe')(keys.stripeSecretKey);
// body-parser will get forum data from server
const bodyParser = require('body-parser');
// handlebars in my template engaine
const exphbs = require('express-handlebars');
// initialize app
const app = express();

// Handlebars Middleware
app.engine('handlebars',exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// Set Static Folder
app.use(express.static(`${__dirname}/public`));


// Index Route passing in stripe keys
app.get('/', (req, res) => {
    res.render('index', {
      stripePublishableKey: keys.stripePublishableKey
    });
  });

// Charge Route
app.post('/charge', (req, res) => {
    const amount = 2500;
    // stripe API calls see doc's
    stripe.customers.create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken
    })
    .then(customer => stripe.charges.create({
      amount,
      description: 'Dev-Tee-Shirt',
      currency: 'usd',
      customer: customer.id
    }))
    .then(charge => res.render('success'));
  });
  
// heroku deployment chooses process.env.PORT or 5000 for local
const port = process.env.PORT || 5000;

// starts server
app.listen(port, () => {
    console.log(`Server spun on ${port}`);
    
});
