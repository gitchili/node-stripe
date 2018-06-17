// App entry point
const express = require('express');
// stripe documation to find api PRV_KEY
const stripe = require('stripe');
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


// Index Route
app.get('/', (req, res) => {
    res.render('index');
  });

// Charge Route
app.post('/charge', (req, res) => {
    const amount = 2500;
    
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
