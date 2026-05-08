import React from "react";
import { useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";
import AxiosToastError from "../utils/AxiosToastError.js";
import toast from "react-hot-toast";
import fetchcategoryDetails from "../utils/fetchcategoryDetails";
import { useDispatch } from "react-redux";
import { setAllCategory } from "../Store/productSlice";
const Uploadcategory = ({ close }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: "",
    image: "",
  });

  const handlechange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handlecategorysubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...summaryApi.addcategory,
        data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        close();
        // fetchcategory();
        const category = await fetchcategoryDetails();
        dispatch(setAllCategory(category.data.data)); // ✅ Call the refresh function passed from parent
      }
      // console.log("response", response.data.data);
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleUploadavatar = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await Axios({
        ...summaryApi.uploadImage,
        data: formData,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        // console.log("imageuploadurlresponse",response.data.data.url);
        setData((preve) => {
          return {
            ...preve,
            image: response.data.data.url,
          };
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="fixed inset-0 flex items-center justify-center bg-neutral-500 z-50 p-4">
      <div className="bg-white p-4 rounded-sm shadow-sm max-w-md w-full relative">
        <div
          className="absolute top-2 right-2 cursor-pointer text-gray-600 hover:text-red-500"
          onClick={close}
        >
          <IoCloseCircleSharp size={26} />
        </div>

        <div className="text-xl font-semibold mb-4">Upload Category</div>

        <form onSubmit={handlecategorysubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="categoryname" className="font-medium text-gray-700">
              Category Name
            </label>

            <input
              type="text"
              id="categoryname"
              placeholder="Enter category name"
              name="name"
              value={data.name}
              onChange={handlechange}
              className="border border-gray-300 rounded-sd px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="productImage" className="font-medium text-gray-700">
              Product Image
            </label>

            <div className="border-2 border border-gray-300 rounded-sm p-4 text-center">
              <img
                src={data.image}
                alt="Product Image"
                className="w-32 h-22 object-cover mx-auto mb-2 rounded-md bg-blue-50"
              />

              <label htmlFor="uploadavatar">
                <div className="text-sm bg-yellow-400 p-1 rounded-sm cursor-pointer hover:bg-yellow-500">
                  Uplaoad Image
                </div>

                <input
                  type="file"
                  id="uploadavatar"
                  className="hidden"
                  onChange={handleUploadavatar}
                />
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="bg-yellow-400 text-white py-2 rounded-sd font-medium hover:bg-yellow-500 transition"
          >
            Submit Category
          </button>
        </form>
      </div>
    </section>
  );
};

export default Uploadcategory;
