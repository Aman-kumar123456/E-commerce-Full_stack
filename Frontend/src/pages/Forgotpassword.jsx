import React, { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError.js";
import { Link, useNavigate } from "react-router-dom";
import summaryApi from "../common/summaryApi";
import toast from "react-hot-toast";
const Forgotpassword = () => {
    const navigate=useNavigate();
  const [data, setData] = useState({
    email: "",
  });
  const handleformdata = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const validate = Object.values(data).every((el) => el);

  const handlesubmit =async (e) => {
    e.preventDefault();

    try {
        const response=await Axios({
            ...summaryApi.forgot_password,
            data
        })

        if(response.data.error){
            toast.error(response.data.message);
        }
        if(response.data.success){
            toast.success(response.data.message);
            navigate("/verify-otp",{
                state:data
            });
            setData({
                email:""
            })
            
        }
        //    console.log(response);
 
    } catch (error) {
        AxiosToastError(error);
    }
  };
  return (
    <section className="w-full bg-green-100 container mx-auto py-6 px-2">
      <div className="bg-white w-full max-w-lg mx-auto my-4 rounded-lg p-6 shadow">
        <p className="text-xl font-semibold text-center">Forgot Password</p>

        <form onSubmit={handlesubmit} className="grid grid-cols-1 gap-4 mt-6">

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

          <button
            disabled={!validate}
            type="submit"
            className={` ${validate ? "bg-yellow-400 hover:bg-yellow-500" : "bg-gray-500"}   text-white py-2 rounded mt-2 transition`}
          >
            Send otp
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

export default Forgotpassword;
