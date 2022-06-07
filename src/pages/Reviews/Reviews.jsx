import React, { useEffect, useState } from "react";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch("https://thawing-garden-32074.herokuapp.com/review")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      });
  }, []);
  return (
    <div className="mt-5 p-5 shadow-lg">
      <h2 className="text-3xl font-bold">Customer review</h2>
      <div className="grid lg:grid-cols-4 gap-4 mt-4 w-full">
        {reviews?.map((review) => (
          <div className="card bg-primary text-primary-content glass shadow-lg">
            <div className="card-body">
              <h2 className="card-title">User: {review?.name}</h2>
              <p>Rating: {review?.rating}/5</p>
              <p>{review?.commentValue}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
