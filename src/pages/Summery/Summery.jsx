import React from "react";
import SummeryCard from "./SummeryCard";

const Summery = () => {
  const data = [
    {
      id: 1,
      title: "Trusted Partner",
      description: " We have served 1500+ customer with top quality product",
    },
    {
      id: 2,
      title: "Annual revenue",
      description: " Our Annual revenue has crossed 1.2M",
    },
    {
      id: 3,
      title: "Customer review",
      description:
        "Customers are really happy with our products quality.We have 10000+ positive review",
    },
    {
      id: 4,
      title: "Annual production",
      description: "We are creating 50k+ tools every year",
    },
  ];
  return (
    <div className="my-5">
      <h1 className="text-3xl font-bold">Annual Summery</h1>
      <div className="grid lg:grid-cols-4 gap-4 mt-4 shadow-md">
        {data.map((info) => (
          <SummeryCard key={info.id} info={info} />
        ))}
      </div>
    </div>
  );
};

export default Summery;
