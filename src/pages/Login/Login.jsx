import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import useToken from "../../hooks/useToken";

const Login = () => {
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    signInWithEmailAndPassword(data.email, data.password);
  };
  const [token] = useToken(user || gUser);
  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token, from, navigate]);

  if (loading || gLoading) {
    return;
  }

  if (token) {
    navigate(from, { replace: true });
  }
  return (
    <div className="form-control w-full max-w-xs mx-auto">
      <h1>Login</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form-control w-full max-w-xs"
      >
        {/* register your input into the hook by invoking the "register" function */}
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

        <input type="submit" value="Login" className="btn" />
      </form>
      <p>
        Dont have an account?{" "}
        <span>
          <Link to="/register">please register</Link>
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

export default Login;
