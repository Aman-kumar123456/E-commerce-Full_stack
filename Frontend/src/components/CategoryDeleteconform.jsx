
import React from "react";
import AxiosToastError from "../utils/Axiostoasterror";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";
import toast from "react-hot-toast";
// import fetchcategoryDetails from "../utils/fetchcategoryDetails";
// import { useDispatch } from "react-redux";
// import { setAllCategory } from "../Store/productSlice";

const CategoryDeleteconform = ({ close,conform, fetchcategory,deletesubcategorydata }) => {
  // const dispatch = useDispatch();
  const handleDeletecategory = async () => {
    try {
      const deleteresponse = await Axios({
        ...summaryApi.deletecategory,
        data: {
          _id: conform._id,
        },
      });
      if (deleteresponse.data.error) {
        toast.error(deleteresponse.data.message);
      }
      if (deleteresponse.data.success) {
        toast.success(deleteresponse.data.message);
        // console.log("deleted subcategory",deleteresponse.data)
        fetchcategory();
        // fetchcategory();  // Call the refresh function passed from parent
        close();
        // const response = await fetchcategoryDetails();

        // update redux
        // dispatch(setAllCategory(response.data.data));
      }
      // console.log(deleteresponse.data);
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <section className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 p-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm mx-auto">
        {/* Message */}
        <p className="text-lg font-semibold text-gray-800 text-center mb-6">
          Do you want to delete this category?
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          {/* Cancel Button (Green) */}
          <button
            onClick={close}
            className="px-5 py-2 rounded-lg bg-green-500 text-white font-medium 
      hover:bg-green-600 transition duration-200"
          >
            Cancel
          </button>

          {/* Delete Button (Red) */}
          <button
            onClick={handleDeletecategory}
            className="px-5 py-2 rounded-lg bg-red-500 text-white font-medium 
      hover:bg-red-600 transition duration-200"
          >
            Confirm
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategoryDeleteconform;
