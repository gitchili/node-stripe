// see stripe API. I call this is app.js under (index route)
module.exports = {
    stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY
  }
