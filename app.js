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


// heroku deployment chooses process.env.PORT or 5000 for local
const port = process.env.PORT || 5000;

// starts server
app.listen(port, () => {
    console.log(`Server spun on ${port}`);
    
});