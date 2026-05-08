import React, { useEffect, useRef, useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/Axiostoasterror";
import { Link, useLocation, useNavigate } from "react-router-dom";
import summaryApi from "../common/summaryApi";
import toast from "react-hot-toast";
const VerifyOtp = () => {
  const location = useLocation();
  // console.log(location);
  const navigate = useNavigate();
  const inputRef = useRef([]);
  useEffect(()=>{
if(!location?.state?.email){
    navigate("/forgot-password");
}
  },[])
  const [data, setData] = useState(["", "", "", "", "", ""]);

  const validate = data.every((el) => el);


  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...summaryApi.verify_otp,
        data: {
          otp: data.join(""),
          email: location?.state?.email,
        },
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        setData(["", "", "", "", "", ""]);
        navigate("/reset-password", {
          state: {
            data: response?.data,
            email: location?.state?.email,
          },
        });
      }
      //    console.log(response);
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <section className="w-full bg-green-100 container mx-auto py-6 px-2">
      <div className="bg-white w-full max-w-lg mx-auto my-4 rounded-lg p-6 shadow">
        <p className="text-xl font-semibold text-center">Verify Otp</p>

        <form onSubmit={handlesubmit} className="grid grid-cols-1 gap-4 mt-6">
          {/* Name */}

          {/* Email */}
          <div className="grid gap-1">
            <label htmlFor="otp">otp :</label>
            <div className="flex gap-5">
              {data.map((input, index) => {
                return (
                  <input
                    key={"otp" + index}
                    type="text"
                    id="otp"
                    ref={(ref) => {
                      inputRef.current[index] = ref;
                      return ref;
                    }}
                    value={data[index]}
                    onChange={(e) => {
                      const value = e.target.value;
                      // console.log("value", value);

                      const newData = [...data];
                      newData[index] = value;
                      setData(newData);

                      if (value && index < 5) {
                        inputRef.current[index + 1].focus();
                      }
                    }}
                    maxLength={1}
                    className="bg-blue-50 w-full max-w-16 p-2 border rounded outline-none focus:border-primary-200 text-center font-semibold"
                  />
                );
              })}
            </div>
          </div>

          {/* Password */}

          {/* Confirm Password */}

          {/* Button */}
          <button
            disabled={!validate}
            type="submit"
            className={` ${validate ? "bg-yellow-400 hover:bg-yellow-500" : "bg-gray-500"}   text-white py-2 rounded mt-2 transition`}
          >
            verify otp
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

export default VerifyOtp;
