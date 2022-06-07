import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import auth from "../../firebase.init";

const Review = () => {
  const [user, loading] = useAuthState(auth);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  if (loading) return;
  const onSubmit = (data) => {
    const commentData = data.comment;
    if (!commentData) return;
    const comment = {
      rating: data.rating,
      name: user.displayName,
      email: user.email,
      commentValue: commentData,
    };

    if (user.email) {
      fetch("https://thawing-garden-32074.herokuapp.com/comments", {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(comment),
      })
        .then((res) => res.json())
        .then((data) => data.acknowledged && toast("Your comment added."));
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" w-2/4 mx-auto radius py-5 shadow-lg"
      >
        <label className="label block mx-auto">
          <span className="label-text">Type your comment here.</span>
        </label>
        <label className="label block mx-auto">
          <span className="label-text">Rating</span>
        </label>
        <input
          className="border my-3 w-96 block mx-auto"
          type="number"
          placeholder="Give your rating"
          {...register("rating", {
            require: {
              value: true,
            },
            max: {
              value: 5,
              message: "Value must be between 0-5",
            },
          })}
        />
        <label htmlFor=""> {errors && <span>{errors.message}</span>}</label>
        <textarea
          {...register("comment", {
            require: {
              value: true,
            },
          })}
          className="textarea textarea-bordered w-96 h-24"
          placeholder="Bio"
        ></textarea>
        <input
          type="submit"
          value={"Post"}
          className="btn block mx-auto btn-sm btn-warning"
        />
      </form>
    </div>
  );
};

export default Review;
