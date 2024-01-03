import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import authServices from "../appwrite/authService";
import { Form, useForm } from "react-hook-form";
import { Button, Input, Logo } from "./index";
import { login } from "../store/authSlice";

function SignUP() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const SignUp = async (data) => {
    setError("");
    try {
      const session = await authServices.createAccount(data);
      if (session) {
        const userData = await authServices.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx—auto w—full max-w-lg
                    bg—gray—100 rounded—xl p—10 border border—black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%"></Logo>
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to creat an Account
        </h2>
        <p className="mt—2 text-center text-base O text-black/60">
          Already Have An Account?&nbsp
          <Link
            to="/login"
            className="font—medium text—primary
                        transition-all duration-200
                        hover: underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-500 text-center">{error}</p>}

        <Form onClick={handleSubmit(SignUp())}>
          <div className="space-y-5">
            <Input
              label="FullName :"
              placeholder="enter Your Full Name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email :"
              placeholder="Enter your Email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) ||
                    "Email Address must be a valid address",
                },
              })}
            />
            <Input
              label="password :"
              type="password"
              placeholder="Enter Your Password"
              {...register("password", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
                      value
                    ) ||
                    " at least 8 character, must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number",
                },
              })}
            />

            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default SignUP;
