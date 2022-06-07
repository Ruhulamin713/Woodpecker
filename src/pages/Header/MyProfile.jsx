import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const MyProfile = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [user, loading] = useAuthState(auth);

  if (loading) return;

  const onSubmit = (data) => {
    const user = data;
    const email = data.email;
    fetch(`https://thawing-garden-32074.herokuapp.com/user/${email}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        data.result.acknowledged &&
          data.result.modifiedCount &&
          toast("User updated");
        data.result.acknowledged &&
          !data.result.modifiedCount &&
          toast("No new data to update");
      });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="block w-2/4 shadow-lg mx-auto"
    >
      <label className="block mx-auto text-xl text-left my-2 w-2/4">
        Name:
      </label>
      <input
        {...register("name", { require: true })}
        type="text"
        value={user.displayName}
        className="block mx-auto text-xl my-2 w-2/4"
        readOnly
      />
      <label className="block mx-auto text-xl text-left my-2 w-2/4">
        Email:
      </label>
      <input
        {...register("email", { require: true })}
        type="email"
        value={user.email}
        className="block mx-auto text-xl my-2 w-2/4"
        readOnly
      />

      <input
        type="text"
        placeHolder="Education qualification"
        className="block mx-auto border text-xl my-2 w-2/4 p-2 border-slate-400"
        {...register("education", { required: true })}
      />
      <input
        type="text"
        placeHolder="Your Location"
        className="block mx-auto border text-xl my-2 w-2/4 p-2 border-slate-400"
        {...register("location", { required: true })}
      />
      <input
        type="number"
        placeHolder="Phone Number"
        className="block mx-auto border text-xl my-2 w-2/4 p-2 border-slate-400"
        {...register("phone", { required: true })}
      />
      <input
        type="text"
        placeHolder="Social account link"
        className="block mx-auto border text-xl my-2 w-2/4 p-2 border-slate-400"
        {...register("social", { required: true })}
      />

      <input type="submit" className="btn btn-sm my-2" />
    </form>
  );
};

export default MyProfile;
