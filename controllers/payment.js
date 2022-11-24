const paypal = require('paypal-rest-sdk');

exports.createPayment = async (req, res) => {
  const sum = req.body.total;

  const create_payment_json = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal',
    },
    redirect_urls: {
      return_url: `${process.env.SERVER_URL}api/success?total=${sum}`,
      cancel_url: `${process.env.SERVER_URL}api/cancel`,
    },
    transactions: [
      {
        amount: {
          currency: 'USD',
          total: sum,
        },
        description: 'HDK Mart - Vi mot suc khoe cong dong',
      },
    ],
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === 'approval_url') {
          // res.redirect(payment.links[i].href);
          res.status(200).json({ data: payment.links[i].href });
        }
      }
    }
  });
};

exports.paymentSuccess = async (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;
  const sum = req.query.total;

  const execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: 'USD',
          total: sum,
        },
      },
    ],
  };

  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    function (error, payment) {
      if (error) {
        console.log(error.response);
        throw error;
      } else {
        console.log(JSON.stringify(payment));
        // res.send('Success (Mua hàng thành công)');
        res.redirect(`${process.env.AUTH_CLIENT_URL}ordersuccess`);
      }
    }
  );
};

exports.paymentCancel = async (req, res) => {
  res.send('Cancelled (Đơn hàng đã hủy)');
};
