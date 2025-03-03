import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { AiOutlineLogin } from "react-icons/ai";
import InputField from "../Shared/InputField";
import { authenticateSignInUser } from "../../Store/Action";
import {toast} from "react-hot-toast"
import Spinners from "../Shared/Spinners";
// import{Spinners} from "react-icons"

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const loginHandler = async (data) => {
    console.log("Login Click");
    dispatch(authenticateSignInUser(data, toast, reset, navigate, setLoader))
  };
  return (
    <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
      <form
        onSubmit={handleSubmit(loginHandler)}
        className="sm:w-[450px] w-[360px] shadow-md py-8 sm:px-8 px-4 rounded-md"
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <AiOutlineLogin className="text-slate-800 text-5xl" />
          <h1 className="text-slate-800 text-center font-montserrat lg:text-3xl text-2xl font-bold">
            Login Here
          </h1>
        </div>
        <hr className="mt-2 mb-5 text-black" />
        <div className="flex flex-col gap-3">
          <InputField
            label="UserName"
            required
            id="username"
            type="text"
            message="*UserName is required"
            placeholder="Enter your username"
            register={register}
            errors={errors}
          />

          <InputField
            label="Password"
            required
            id="password"
            type="password"
            message="*Password is required"
            placeholder="Enter your password"
            register={register}
            errors={errors}
          />
        </div>
        <button
          disabled={loader}
          className="bg-[linear-gradient(45deg,_#78078a,_#f2522e)] flex gap-2 items-center justify-center font-semibold text-slate-300 w-full py-2 hover:text-white transition-colors duration-300 rounded-sm my-3"
          type="submit"
        >
          {loader ? (
            <>
              <Spinners/> Loading...
            </>
          ) : (
            <>Login</>
          )}
        </button>

        <p className="text-center text-sm text-slate-700 mt-6">
          Don't have an account?
          <Link
            className="font-semibold underline hover:text-black"
            to="/register"
          >
            <span> SignUp</span>
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
