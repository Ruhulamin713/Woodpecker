import React from "react";
import { Link } from "react-router-dom";

const ShowOrders = ({ order, cancelOrder, index }) => {
  const { _id, productName, userEmail, amount, price, paid } = order;

  return (
    <tr>
      <th>{index + 1}</th>
      <td>{productName}</td>
      <td>{userEmail}</td>
      <td>{amount}</td>
      <td>{price}</td>
      <td>
        {price && !paid && (
          <Link to={`/dashboard/payment/${_id}`}>
            <button className="btn btn-xs bg-green-500">Pay</button>
          </Link>
        )}
        {price && paid && <span className="text-success">Paid</span>}
      </td>
      <td>
        {price && !paid && (
          <button
            className="btn btn-xs bg-red-600"
            onClick={() => cancelOrder(_id)}
          >
            Cancel Oder
          </button>
        )}
      </td>
    </tr>
  );
};

export default ShowOrders;
