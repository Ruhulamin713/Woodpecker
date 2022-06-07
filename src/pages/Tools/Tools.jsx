import React, { useEffect, useState } from "react";

import ShowTools from "./ShowTools";

const Tools = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch("https://thawing-garden-32074.herokuapp.com/tools")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  return (
    <div>
      <h3 className="text-3xl font-bold my-4">Tools</h3>
      <div className="grid lg:grid-cols-3 gap-4 mt-4 shadow-md">
        {items.map((item) => (
          <ShowTools item={item} />
        ))}
      </div>
    </div>
  );
};

export default Tools;
