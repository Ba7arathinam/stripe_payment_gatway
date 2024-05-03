const stripe = require('stripe')('sk_test_51Mbj8eSAej2N1Wqjun6hYB6mHrPbUaw6N1p078IZ4c2pa1L1QEOtvYDj9bLi5DUUpNZG4HSEvbQSt7BpyCmliSYK008tDDpvG4');
const express = require('express');
const app = express();
const cors=require('cors')
app.use(cors())
app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:4242';

app.get('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell

        quantity: 1,
         price_data: {
      currency: 'INR',
      unit_amount: req.query.amount *100,
      product_data: {
        name: 'Total Amount to pay',
        description: 'grab your food on your doors',
        images: ['https://th.bing.com/th/id/OIP.F6VyuMUgr0Rx8wTNPJ8mBAHaIu?rs=1&pid=ImgDetMain'],
      },
    },
      },
    ],
    mode: 'payment',
    success_url: `http://localhost:4200/confirmation?success=true`,
    cancel_url: `http://localhost:4200/confirmation?success=false`,
  });
  
  console.log(session)
  res.json({ url: session.url })
});

app.listen(4242, () => console.log('Running on port 4242'));