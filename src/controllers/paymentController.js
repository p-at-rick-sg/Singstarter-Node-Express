const stripe = require('stripe')(process.env.STRIPE_TEST);
const {OrderModel} = require('../models/projectModel');

const createCheckout = async (req, res) => {
  const FE_PORT = process.env.FE_PORT;
  console.log(FE_PORT);
  console.log(`checkout api starting and port is set to ${FE_PORT}`);

  //create a session - taking the body parameters from the api call
  const {product} = req.body;
  if (product.orderID) {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'sgd',
            product_data: {
              name: product.name,
            },
            unit_amount: product.price,
          },
          quantity: product.quantity,
        },
      ],
      metadata: {
        order_id: product.orderID,
      },
      mode: 'payment',
      success_url: 'http://localhost:' + FE_PORT + '/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:' + FE_PORT + '/cancel',
    });
    console.log('session details', session);
    console.log();
    res.json({id: session.id});
  }
};

const getSuccessDetails = async (req, res) => {
  try {
    const sessionResult = await stripe.checkout.sessions.retrieve(req.body.sessionID);
    if (sessionResult) {
      console.log(sessionResult);
      dbResult = await OrderModel.findByIdAndUpdate();
      return res.status(200).json(sessionResult);
    }
  } catch (err) {
    // Handle errors
    console.error('Error retrieving session details:', err);
    return null;
  }
};

module.exports = {createCheckout, getSuccessDetails};
