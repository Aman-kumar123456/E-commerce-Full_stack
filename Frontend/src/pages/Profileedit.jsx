import React from "react";
import { useState } from "react";

import { GiCrossMark } from "react-icons/gi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import summaryApi from "../common/summaryApi";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../Store/userSlice";
import { useNavigate } from "react-router-dom";

const Profileedit = ({ close }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...summaryApi.update_userdetails,
        data,
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);

        dispatch(setUserDetails(response.data.data));
        // navigate('/dashboard/profile');
        close();
      }
      // console.log("edited user data is:",response.data);
      //   console.log("Edited data is:", data);
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <div className="bg-gray-400  p-5 font-black text-4xl fixed top-0 bottom-0 left-0 right-0">
      <div className="min-h-screen flex items-center justify-center bg-gray-400">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 rounded-sm shadow-sm w-full max-w-md space-y-2"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-center">
              {" "}
              Edit your Profile
            </h2>
            <div>
              <GiCrossMark onClick={close} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={data.name}
              onChange={handleChange}
              className="w-full border rounded-sm px-1 py-1 autofocus text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={data.email}
              onChange={handleChange}
              className="w-full border rounded-sm px-1 py-1 autofocus text-sm "
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mobile</label>
            <input
              type="tel"
              name="mobile"
              placeholder="Enter your mobile number"
              value={data.mobile}
              onChange={handleChange}
              className="w-full border rounded-sm px-1 py-1 autofocus text-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400  py-1 rounded-sm hover:bg-yellow-500 text-sm "
          >
            Submit
          </button>
        </form>
      </div>
      {/* Profileedit */}
    </div>
  );
};

export default Profileedit;
