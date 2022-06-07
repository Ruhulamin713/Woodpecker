import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const AddTools = () => {
  const imgApiKey = "20c090778d782517dd6c05068af494ca";
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const image = data.img[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imgApiKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          const imgUrl = result.data.url;
          const tool = {
            img: imgUrl,
            item: data.item,
            available: +data.available,
            minimumorder: +data.minimumorder,
            price: +data.price,
          };
          fetch("https://thawing-garden-32074.herokuapp.com/tool", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authentication: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(tool),
          })
            .then((res) => res.json())
            .then((addedTool) => {
              if (addedTool.insertedId) {
                toast.success("Item is added");
                reset();
              } else {
                toast.error("Failed to add the tool");
              }
            });
        }
      });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-96 mx-auto shadow-lg mt-10 p-5"
    >
      <label className="text-2xl font-bold my-4">Add/Update product</label>
      <label className="label">
        <span className="label-text">Item name</span>
        {errors?.exampleRequired && (
          <span className="text-error">This field is required</span>
        )}
      </label>
      <input
        type="text"
        className="block input input-bordered input-xs w-full max-w-xs border"
        t
        {...register("item", { required: true })}
      />
      <label className="label">
        <span className="label-text">Number of available product</span>
        {errors?.exampleRequired && (
          <span className="text-error">This field is required</span>
        )}
      </label>
      <input
        type="number"
        className="block input input-bordered input-xs w-full max-w-xs border"
        t
        {...register("available", { required: true })}
      />
      <label className="label">
        <span className="label-text">Minimum Order</span>
        {errors?.exampleRequired && (
          <span className="text-error">This field is required</span>
        )}
      </label>
      <input
        type="number"
        placeholder="Type here"
        className="block input input-bordered input-xs w-full max-w-xs border"
        t
        {...register("minimumorder", { required: true })}
      />
      <label className="label">
        <span className="label-text">Product Price</span>
        {errors?.exampleRequired && (
          <span className="text-error">This field is required</span>
        )}
      </label>
      <input
        type="number"
        placeholder="Type here"
        className="block input input-bordered input-xs w-full max-w-xs border"
        t
        {...register("price", { required: true })}
      />
      <label className="label">
        <span className="label-text">Image Url</span>
        {errors?.exampleRequired && (
          <span className="text-error">This field is required</span>
        )}
      </label>
      <input
        type="file"
        placeholder="Type here"
        className="block input input-bordered input-xs w-full max-w-xs border"
        t
        {...register("img", { required: true })}
      />

      <input
        type="submit"
        value="Submit"
        className="btn btn-sm block mx-auto"
      />
    </form>
  );
};

export default AddTools;
