import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51L4OgICKY9DKCcgGslWCYQ9ZdI4FgXaXc6KspEwmSWk5OyXc28U7SBLusELV4axGrrFsF0JnwiMxyLhEP6pTsHPt006zJh3OpM"
);

const Payment = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState({});
  useEffect(() => {
    const url = `https://thawing-garden-32074.herokuapp.com/order/${orderId}`;
    fetch(url, {
      method: "GET",
      headers: {
        authentication: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrder(data);
      });
  }, [orderId]);

  const totalPrice = +order.amount * +order.price;
  return (
    <div>
      <div className="card w-50 max-w-md bg-base-200 shadow-xl my-12 mx-auto">
        <div className="card-body">
          <h2 className="card-title mx-auto">{order.productName}</h2>
          <p>Amount: {order.amount}</p>
          <p>Total Price: ${totalPrice}</p>
        </div>
      </div>
      <div className="card flex-shrink-0 w-50 max-w-md shadow-2xl bg-base-200 mx-auto">
        <div className="card-body">
          <Elements stripe={stripePromise}>
            <CheckoutForm totalPrice={totalPrice} order={order} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
