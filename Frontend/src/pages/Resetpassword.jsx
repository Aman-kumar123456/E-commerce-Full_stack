import React, { useEffect, useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";
import AxiosToastError from "../utils/AxiosToastError.js";
import { Link, useLocation, useNavigate } from "react-router-dom";
const Resetpassword = () => {
  const location = useLocation();
  // console.log(location);
  const [showpassword, setShowpassword] = useState(false);
  const [showconfirmpassword, setShowconfirmpassword] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({
    newpassword: "",
    repeatnewpassword: "",
  });

  useEffect(()=>{
    if(!location?.state?.email){
        navigate("/login")
    }
  },[])
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
    if (data.newpassword !== data.repeatnewpassword) {
      toast.error("password and confirm password must be same");
      return;
    }

    try {
      const response = await Axios({
        ...summaryApi.reset_password,
        data:{
            ...data,
            email:location?.state?.email
        }
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        setData({
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
    <section className="w-full bg-green-100 container mx-auto py-6 px-2">
      <div className="bg-white w-full max-w-lg mx-auto my-4 rounded-lg p-6 shadow">
        <p className="text-xl font-semibold text-center">Reset password</p>

        <form onSubmit={handlesubmit} className="grid grid-cols-1 gap-4 mt-6">
          {/* Name */}

          {/* Email */}

          {/* newpassword */}
          <div className="grid gap-1">
            <label htmlFor="newpassword">Newpassword :</label>

            <div className="flex items-center bg-blue-50 rounded px-2">
              <input
                type={showpassword ? "text" : "password"}
                id="newpassword"
                autoFocus
                className="bg-transparent p-2 w-full outline-none"
                name="newpassword"
                placeholder="Enter your newpassword"
                value={data.newpassword}
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
            <label htmlFor="repeatnewpassword">RepeatNewpassword :</label>

            <div className="flex items-center bg-blue-50 rounded px-2">
              <input
                type={showconfirmpassword ? "text" : "password"}
                id="repeatnewpassword"
                autoFocus
                className="bg-transparent p-2 w-full outline-none"
                name="repeatnewpassword"
                placeholder="Enter your repeatnewpassword"
                value={data.repeatnewpassword}
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
            Reset
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

export default Resetpassword;
