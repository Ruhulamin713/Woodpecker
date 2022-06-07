import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import ShowOrders from "./ShowOrders";

const MyOrders = () => {
  const [user, loading] = useAuthState(auth);
  const email = user?.email;
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (user) {
      const url = `https://thawing-garden-32074.herokuapp.com/orders/?email=${email}`;
      fetch(url, {
        method: "GET",
        headers: {
          authentication: `Bearer ${accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setOrders(data));
    }
  }, [user, orders]);

  if (loading) return;
  const cancelOrder = (id) => {
    fetch(`https://thawing-garden-32074.herokuapp.com/order/${id}`, {
      method: "DELETE",
      headers: {
        authentication: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged && data.deletedCount) {
          const updatedOrder = orders.filter((order) => orders?._id !== id);
          setOrders(updatedOrder);
          toast("Order deleted");
        }
      });
  };
  return (
    <div className="overflow-x-auto ">
      <table className="table w-full">
        <thead className="w-full">
          <tr>
            <th></th>
            <th>Product name</th>
            <th>User Email</th>
            <th>Product Amount</th>
            <th>Price</th>
            <th>Payment</th>
            <th>Cancel</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <ShowOrders order={order} index={index} cancelOrder={cancelOrder} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;
