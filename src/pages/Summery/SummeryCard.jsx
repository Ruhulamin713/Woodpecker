import React from "react";

const SummeryCard = ({ info }) => {
  return (
    <div>
      <div className="card w-50 bg-blue-300 glass text-neutral-content m-5 h-44">
        <div className="card-body items-center text-center">
          <h2 className="card-title">{info.title}</h2>
          <p>{info.description}</p>
        </div>
      </div>
    </div>
  );
};

export default SummeryCard;
