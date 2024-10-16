const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(cors({ origin: true }));

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "sucess",
  });
});


app.post('/payment/create', async (req, res) => {
  const { total } = req.query;  // total is in cents

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: 'usd',
    });

    res.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ error: 'Payment Intent creation failed' });
  }
});


app.listen(5000, (err) => {
  if (err) throw err;
  console.log("Amazon server running on PORT:5000,http://localhost:5000");
});
