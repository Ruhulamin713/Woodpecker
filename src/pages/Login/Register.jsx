import React from "react";
import {
  useSignInWithGoogle,
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
  useAuthState,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import useToken from "../../hooks/useToken";

const Register = () => {
  const navigate = useNavigate();
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const displayName = data.name;
    await createUserWithEmailAndPassword(data.email, data.password);
    await updateProfile({ displayName });
  };

  const [token] = useToken(user || gUser);
  console.log(token);
  if (loading || gLoading || updating) {
    return;
  }
  if (token) {
    navigate("/");
  }
  console.log(user);

  return (
    <div className="form-control w-full max-w-xs mx-auto">
      <h1>Register</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form-control w-full max-w-xs"
      >
        {/* register your input into the hook by invoking the "register" function */}
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          className="input input-bordered w-full max-w-xs"
          type="text"
          placeholder="Your name"
          {...register("name", {
            required: {
              value: true,
              message: "Name is required",
            },
          })}
        />
        <label className="label">
          {errors.name?.type === "required" && (
            <span>{errors?.email?.message}</span>
          )}
        </label>
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          className="input input-bordered w-full max-w-xs"
          type="email"
          placeholder="Your email"
          {...register("email", {
            required: {
              value: true,
              message: "Email is required",
            },
            pattern: {
              value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
              message: "Provide a valid email",
            },
          })}
        />
        <label className="label">
          {errors.email?.type === "required" && (
            <span>{errors.email.message}</span>
          )}
          {errors.email?.type === "pattern" && (
            <span>{errors.email.message}</span>
          )}
        </label>
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          className="input input-bordered w-full max-w-xs"
          type="password"
          placeholder="Your password"
          {...register("password", {
            required: {
              value: true,
              message: "Password is required",
            },
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        <label className="label">
          {errors.password?.type === "required" && (
            <span>{errors.password.message}</span>
          )}
          {errors.password?.type === "minLength" && (
            <span>{errors.password.message}</span>
          )}
        </label>

        <input type="submit" value="Register" className="btn" />
      </form>
      <p>
        already have an account?{" "}
        <span>
          <Link to="/login"> please login</Link>
        </span>
      </p>
      <div className="divider">or</div>
      <div className="w-full">
        <button className="btn" onClick={() => signInWithGoogle()}>
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Register;
