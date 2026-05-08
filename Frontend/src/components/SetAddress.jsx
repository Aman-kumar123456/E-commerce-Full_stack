import React from "react";
import { useForm } from "react-hook-form";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";
import toast from "react-hot-toast";
import getAddress from "../utils/getAddress";
import { useDispatch } from "react-redux";
import { setAlladdress } from "../Store/addressSlice";
import { IoMdClose } from "react-icons/io";
const SetAddress = ({ close }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log("data:", data);

    try {
      const addressresponse = await Axios({
        ...summaryApi.addAddress,
        data: {
          address_line: data.addressline,
          city: data.city,
          state: data.state,
          pincode: data.pincode,
          country: data.country,
          mobile: data.mobile,
        },
      });
      if (addressresponse.data.error) {
        toast.error(addressresponse.data.message);
      }
      if (addressresponse.data.success) {
        toast.success(addressresponse.data.message);
        // console.log("addressresponse is :", addressresponse);
        const getallAddress = await getAddress();
        dispatch(setAlladdress(getallAddress.data));
        if (close) {
          close();
        }
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <section className="fixed top-0 left-0  right-0 bottom-0  bg-neutral-800  opacity-90 flex items-center justify-center z-50">
      <div className="bg-white p-4 w-full max-w-lg mt-1 ">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Add Address</h2>
          <button onClick={close} className="hover:text-red-400">
            <IoMdClose size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <div className="flex flex-col">
            <label htmlFor="addressline">Address Line:</label>
            <input
              type="text"
              id="addressline"
              className="border bg-blue-50 mt-2 p-1"
              {...register("addressline", { required: true })}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="city">City :</label>
            <input
              type="text"
              id="city"
              className="border bg-blue-50 mt-2 p-1"
              {...register("city", { required: true })}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="state">State :</label>
            <input
              type="text"
              id="state"
              className="border bg-blue-50 mt-2 p-1"
              {...register("state", { required: true })}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="pincode">Pincode:</label>
            <input
              type="text"
              id="pincode"
              className="border bg-blue-50 mt-2 p-1"
              {...register("pincode", { required: true })}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="country">Country:</label>
            <input
              type="text"
              id="country"
              className="border bg-blue-50 mt-2 p-1"
              {...register("country", { required: true })}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="mobile">Mobile NO. :</label>
            <input
              type="text"
              id="mobile"
              className="border bg-blue-50 mt-2 p-1"
              {...register("mobile", { required: true })}
            />
          </div>
          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-500 w-full font-semibold mt-4 p-1"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default SetAddress;
