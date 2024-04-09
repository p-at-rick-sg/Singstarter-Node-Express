const stripe = require('stripe')(process.env.STRIPE_TEST);
const {OrderModel, ProjectModel} = require('../models/projectModel');

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
      orderUpdateResult = await OrderModel.findByIdAndUpdate(sessionResult.metadata.order_id, {
        paymentID: sessionResult.payment_intent,
      });

      result = await OrderModel.findById(sessionResult.metadata.order_id);
      const projectResult = await ProjectModel.findByIdAndUpdate(result.projectID, {
        $inc: {target: result.totalValue},
      });
      console.log('project id should be this: ', projectResult);

      return res.status(200).json({
        orderID: sessionResult.metadata.order_id,
        status: 'ok',
        message: 'order successfully placed and db upadted',
      });
    }
  } catch (err) {
    // Handle errors
    console.error('Error retrieving session details:', err);
    return res.status(400).json({status: 'error', msg: 'failed to upadte the database'});
  }
};

module.exports = {createCheckout, getSuccessDetails};
