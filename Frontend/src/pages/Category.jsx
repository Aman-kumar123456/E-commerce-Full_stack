import React, { useState } from "react";
import Uploadcategory from "../components/Uploadcategory";
import { useEffect } from "react";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";
import AxiosToastError from "../utils/AxiosToastError.js";
import Loading from "../components/Loading";
import Editcategory from "../components/Editcategory";
import Conform from "../components/Conform";
import { useSelector, useDispatch } from "react-redux";
import { setAllCategory } from "../Store/productSlice";
import CategoryDeleteconform from "../components/CategoryDeleteconform";

const Category = () => {
  const dispatch = useDispatch();
  const [openuploadcategory, setOpenuploadcategory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allcategory, setallCategory] = useState([]);
  const [openEditcategory, setOpeneditcategory] = useState(false);
  const [autofilleditdata, setAutofilleditData] = useState();
  const [opendelete, setOpendelete] = useState(false);
  const [conform, setConform] = useState();

  const allreduxCategory = useSelector((state) => state?.product.allCategory);

  // console.log("data coming from redux is:", allreduxCategory);

  useEffect(() => {
    setallCategory(allreduxCategory);
  }, [allreduxCategory]);

  // Function to refresh category data from API and update Redux
  const fetchcategory = async () => {
    try {
      setLoading(true);
      const category = await Axios({
        ...summaryApi.getcategory,
      });
      if (category.data.success) {
        dispatch(setAllCategory(category.data.data));
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchcategory();
  }, []);

  return (
    <section className="w-full">
      <div className="flex items-center justify-between bg-white px-6 py-4 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-700">
          Category Product
        </h2>

        <button
          onClick={() => setOpenuploadcategory(true)}
          className="bg-yellow-400 hover:bg-yellow-500 text-white px-5 py-2 rounded-sm font-medium"
        >
          Upload Category
        </button>
      </div>

      {loading ? (
        <div className="ml-30">
          <Loading />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 mt-6">
          {allcategory.map((item, index) => {
            return (
              <div
                className="relative bg-white p-2 rounded-sm shadow-sm hover:shadow-lg transition duration-300 w-full"
                key={item._id}
              >
                <img
                  alt={item.name}
                  src={item.image}
                  className="w-full h-30 object-contain rounded-lg hover:scale-110"
                />
                <div className="flex items-center justify-center w-full">
                  <p className="text-center w-full" >{item.name}</p>
                  </div>

                <div className="flex justify-between mt-3">
                  <button
                    onClick={() => {
                      setOpeneditcategory(true);
                      setAutofilleditData(item);
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded-md transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => {
                      setOpendelete(true);
                      setConform(item);
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-md transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}


      {openuploadcategory && (
        <Uploadcategory
          close={() => setOpenuploadcategory(false)}
          // fetchcategory={fetchcategory}
        />
      )}
      {openEditcategory && (
        <Editcategory
          close={() => setOpeneditcategory(false)}
          // fetchcategory={fetchcategory}
          autofilleditdata={autofilleditdata}
        />
      )}
      {opendelete && (
        <CategoryDeleteconform
          close={() => setOpendelete(false)}
          fetchcategory={fetchcategory}
          conform={conform}
        />
      )}
    </section>
  );
};

export default Category;
