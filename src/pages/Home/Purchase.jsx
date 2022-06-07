import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import auth from "../../firebase.init";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Purchase = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [user, loading] = useAuthState(auth);
  const { id } = useParams();
  const [tool, setTool] = useState({});

  useEffect(() => {
    const url = `https://thawing-garden-32074.herokuapp.com/tools/${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setTool(data);
      });
  }, []);
  const onSubmit = (userData) => {
    userData.productId = tool._id;
    userData.productName = tool.item;
    userData.price = tool.price;
    userData.paid = false;
    const order = userData;

    fetch("https://thawing-garden-32074.herokuapp.com/orders", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged && data.insertedId) {
          toast("Your order is confirmed!");
        }
      });
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold">Place Order</h2>
      <p>{tool.item}</p>
      <form
        className="form-control w-full max-w-xs mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          value={user.displayName}
          readOnly
          {...register("userName")}
        />
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          value={user.email}
          readOnly
          {...register("userEmail")}
        />
        <label className="label">
          <span className="label-text">Purchase Amount</span>
        </label>
        <input
          type="number"
          className="input input-bordered w-full max-w-xs"
          {...register("amount", {
            required: {
              value: true,
              message: "Product amount is required!",
            },
            min: {
              value: 3,
              message: "Purchase amount can't be less than 3",
            },
            max: {
              value: `${tool.available}`,
              message: `Amount Can't be higher than available amount`,
            },
          })}
        />
        <label className="label">
          {errors.amount && (
            <span className="text-red-500">{errors.amount.message}</span>
          )}
        </label>

        <label className="label">
          <span className="label-text">Phone Number</span>
        </label>
        <input
          type="number"
          className="input input-bordered w-full max-w-xs"
          {...register("phoneNumber", {
            required: {
              value: true,
              message: "Phone number is required",
            },
          })}
        />
        <label className="label">
          <span className="label-text">Address</span>
        </label>
        <input
          type="textArea"
          className="input input-bordered w-full max-w-xs"
          {...register("address", {
            required: {
              value: true,
              message: "Address is required",
            },
          })}
        />
        <input
          type="submit"
          value="Order"
          className="input input-bordered mt-3 w-full max-w-xs bg-red-400"
        />
      </form>
    </div>
  );
};

export default Purchase;
