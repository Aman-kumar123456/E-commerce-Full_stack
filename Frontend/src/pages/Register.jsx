import React, { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";
import AxiosToastError from "../utils/Axiostoasterror";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const [showpassword, setShowpassword] = useState(false);
  const [showconfirmpassword, setShowconfirmpassword] = useState(false);
  const navigate=useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const handleformdata = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const validate = Object.values(data).every((el) => el);

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (data.password !== data.confirmpassword) {
      toast.error("password and confirm password must be same");
      return;
    }

    try {
      const response = await Axios({
        ...summaryApi.register,
        data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        setData({
          name: "",
          email: "",
          password: "",
          confirmpassword: "",
        });
        navigate("/login");
      }
      // console.log(response.data.message);
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="w-full bg-blue-100 container mx-auto py-6 px-2">
      <div className="bg-white w-full max-w-lg mx-auto my-4 rounded-lg p-6 shadow">
        <p className="text-xl font-semibold text-center">
          Welcome to Ecommerce
        </p>

        <form onSubmit={handlesubmit} className="grid grid-cols-1 gap-4 mt-6">
          {/* Name */}
          <div className="grid gap-1">
            <label htmlFor="name">Name :</label>
            <input
              type="text"
              id="name"
              autoFocus
              className="bg-blue-50 p-2 rounded outline-none focus:ring-2 focus:ring-blue-300"
              name="name"
              placeholder="Enter your name"
              value={data.name}
              onChange={handleformdata}
            />
          </div>

          {/* Email */}
          <div className="grid gap-1">
            <label htmlFor="email">email :</label>
            <input
              type="email"
              id="email"
              autoFocus
              className="bg-blue-50 p-2 rounded outline-none focus:ring-2 focus:ring-blue-300"
              name="email"
              placeholder="Enter your email"
              value={data.email}
              onChange={handleformdata}
            />
          </div>

          {/* Password */}
          <div className="grid gap-1">
            <label htmlFor="password">password :</label>

            <div className="flex items-center bg-blue-50 rounded px-2">
              <input
                type={showpassword ? "text" : "password"}
                id="password"
                autoFocus
                className="bg-transparent p-2 w-full outline-none"
                name="password"
                placeholder="Enter your password"
                value={data.password}
                onChange={handleformdata}
              />

              <div
                className="cursor-pointer text-gray-600"
                onClick={() => setShowpassword((preve) => !preve)}
              >
                {showpassword ? <IoMdEyeOff /> : <IoMdEye />}
              </div>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="grid gap-1">
            <label htmlFor="confirmpassword">confirmpassword :</label>

            <div className="flex items-center bg-blue-50 rounded px-2">
              <input
                type={showconfirmpassword ? "text" : "password"}
                id="confirmpassword"
                autoFocus
                className="bg-transparent p-2 w-full outline-none"
                name="confirmpassword"
                placeholder="Enter your confirmpassword"
                value={data.confirmpassword}
                onChange={handleformdata}
              />

              <div
                className="cursor-pointer text-gray-600"
                onClick={() => setShowconfirmpassword((preve) => !preve)}
              >
                {showconfirmpassword ? <IoMdEyeOff /> : <IoMdEye />}
              </div>
            </div>
          </div>

          {/* Button */}
          <button
            disabled={!validate}
            type="submit"
            className={` ${validate ? "bg-yellow-400 hover:bg-yellow-500" : "bg-gray-500"}   text-white py-2 rounded mt-2 transition`}
          >
            Register
          </button>
        </form>
<div className="text-center mt-4 text-sm text-gray-600">
  Already registered?{" "}
  <Link to="/login">
    <span className="text-yellow-500 font-medium hover:text-yellow-600 hover:underline transition">
      Login
    </span>
  </Link>
</div>
      </div>
    </section>
  );
};

export default Register;
