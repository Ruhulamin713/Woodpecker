import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { type } from "@testing-library/user-event/dist/type";
import React, { useEffect, useState } from "react";

const CheckoutForm = ({ totalPrice, order }) => {
  const { _id, userName, userEmail } = order;
  console.log(userName, userEmail);
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [success, setSuccess] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [clientSecret, seClientSecret] = useState("");
  useEffect(() => {
    fetch("https://thawing-garden-32074.herokuapp.com/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authentication: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ totalPrice }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.clientSecret) {
          seClientSecret(data.clientSecret);
        }
      });
  }, [totalPrice]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    setCardError(error?.message || "");
    //confirm payment
    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: userName,
            email: userEmail,
          },
        },
      });
    if (intentError) {
      setCardError(intentError?.message);
      setSuccess("");
    } else {
      setCardError("");
      setTransactionId(paymentIntent.id);
      console.log(paymentIntent);
      setSuccess("Payment completed !");
      //STORE PAYMENT
      const payment = {
        orderId: _id,
        transactionId: paymentIntent.id,
      };
      fetch(`https://thawing-garden-32074.herokuapp.com/order/${_id}`, {
        method: "PATCH",
        headers: {
          authentication: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          type="submit"
          className="mx-auto btn btn-xs btn-success"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
      </form>
      {cardError && <p className="text-red-500">{cardError}</p>}
      {success && (
        <div>
          <p>
            Your Transaction d is:{" "}
            <span className="text-blue-500">{transactionId}</span>
          </p>
          <p className="text-green-500">{success}</p>
        </div>
      )}
    </>
  );
};

export default CheckoutForm;

/*steps
*install stripe for react 
open account on stripe(if new)
get public key
create elements rapper using publishing able key
create checkout form using card element,useStripe, useElements
get card elements info (credit card info)
--------------------------------------
get credit card info/error
*/
