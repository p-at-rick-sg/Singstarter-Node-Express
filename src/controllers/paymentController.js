const stripe = require('stripe')(process.env.STRIPE_TEST);

const createCheckout = async (req, res) => {
  const FE_PORT = process.env.FE_PORT;
  console.log(FE_PORT);
  console.log(`checkout api starting and port is set to ${FE_PORT}`);

  //create a session - taking the body parameters from the api call
  const {product} = req.body;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'sgd',
          product_data: {
            name: product.name,
          },
          unit_amount: product.price * 100,
        },
        quantity: product.quantity,
      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:' + FE_PORT + '/success',
    cancel_url: 'http://localhost:' + FE_PORT + '/cancel',
  });
  res.json({id: session.id});
};

module.exports = {createCheckout};
