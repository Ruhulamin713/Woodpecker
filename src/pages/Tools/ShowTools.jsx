import React from "react";
import { useNavigate } from "react-router-dom";
import Purchase from "../Home/Purchase";

const ShowTools = (props) => {
  const { _id, item, img, description, minimumorder, available, price } =
    props.item;

  const navigate = useNavigate();
  const handleOrder = () => {
    const url = `/purchase/${_id}`;
    navigate(url);
  };

  return (
    <div className="card  bg-base-100 shadow-xl m-5 pt-5">
      <figure>
        <img src={img} alt="" className="w-32" />
      </figure>

      <div className="card-body">
        <p>{item}</p>
        <p>Minimum Order: {minimumorder}</p>
        <p>Available: {available}</p>
        <p>price: ${price}</p>
      </div>

      <button className="btn btn-error" onClick={handleOrder}>
        order
      </button>
    </div>
  );
};

export default ShowTools;
