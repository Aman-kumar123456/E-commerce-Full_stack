import React, { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError.js";
import summaryApi from "../common/summaryApi";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import fetchUserdetails from "../utils/fetchuserDetails";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../Store/userSlice";
import getcartitems from "../utils/fetchcartitem";
import { setCartitems } from "../Store/cartSlice.js";
import getAddress from "../utils/getAddress.js";
import { setAlladdress } from "../Store/addressSlice.js";
import getAllorders from "../utils/getallOrders.js";
import { setOrder } from "../Store/orderSlice.js";
import fetchsubcategoryDetails from "../utils/fetchsubcategoryDetails.js";
import { setAllSubCategory } from "../Store/productSlice.js";
const Login = () => {
  const [showpassword, setShowpassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
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

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...summaryApi.login,
        data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("accesstoken", response.data.data.accesstoken);
        localStorage.setItem("refreshtoken", response.data.data.refreshtoken);

        const userData = await fetchUserdetails();
        // console.log("In login page userData:",userData);
        dispatch(setUserDetails(userData.data));

        const cartitems = await getcartitems();
        dispatch(setCartitems(cartitems.data));

        //get and dispatch all adddress after login

        const getaddress = await getAddress();
        // console.log("AllAddress is:",getaddress);
        dispatch(setAlladdress(getaddress.data));

        // get all orders after login immediately
        const allorder = await getAllorders();
        dispatch(setOrder(allorder.data));


        setData({
          email: "",
          password: "",
        });
        navigate("/");
      }
      // console.log("response",response);
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <section className="w-full bg-blue-100 container mx-auto py-6 px-2">
      <div className="bg-white w-full max-w-lg mx-auto my-4 rounded-lg p-6 shadow">
        <p className="text-xl font-semibold text-center">Login</p>

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
          <Link
            className="block ml-auto hover:text-blue-600"
            to={"/forgot-password"}
          >
            Forgot password ?
          </Link>

          <button
            disabled={!validate}
            type="submit"
            className={` ${validate ? "bg-yellow-400 hover:bg-yellow-500" : "bg-gray-500"}   text-white py-2 rounded mt-2 transition`}
          >
            Login
          </button>
        </form>
        <div className="text-center mt-4 text-sm text-gray-600">
          Don't have account ?{" "}
          <Link to="/register">
            <span className="text-yellow-500 font-medium hover:text-yellow-600 hover:underline transition">
              Register
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
