import React, { useEffect, useRef, useState } from "react";
import AxiosToastError from "../utils/AxiosToastError.js";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";
import toast from "react-hot-toast";
import ProductLoadingcard from "./ProductLoadingcard";
import CategortProCard from "./CategortProCard";
import { IoIosArrowDropdownCircle } from "react-icons/io";

const CategoryProductcard = ({ id }) => {
  const [Loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const scrollref = useRef();

  const handleScrollDown = () => {
    scrollref.current.scrollBy({
      top: 50,
      behavior: "smooth",
    });
  };
  const fetchproductbycategoryid = async () => {
    try {
      setLoading(true);
      const productresponse = await Axios({
        ...summaryApi.fetchproductbycategory,
        data: {
          id: id,
        },
      });
      if (productresponse.data.error) {
        toast.error(productresponse.data.message);
      }
      if (productresponse.data.success) {
        // toast.success(productresponse.data.message);
        setData(productresponse.data.data);
        // console.log("category wise product data is:", data);
        // console.log("category wise product is: ", productresponse.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchproductbycategoryid();
  }, []);

  const loadingcard = new Array(10).fill(null);
  return (
    <section className="relative">
      <div ref={scrollref} className="h-[210px] overflow-y-auto ">
        <div className="grid lg:grid-cols-7 grid-cols-2 md:grid-cols-4 gap-1">
          {Loading
            ? loadingcard.map((el, index) => (
                <ProductLoadingcard key={index + "loadingcard"} />
              ))
            : data.map((product) => (
                <CategortProCard key={product._id} product={product} />
              ))}
        </div>
      </div>

      <button
        onClick={handleScrollDown}
        className="
        absolute 
        bottom-2 
        left-1/2 
        -translate-x-1/2
        z-10
        bg-white
        rounded-full
        shadow-md
      "
      >
        <IoIosArrowDropdownCircle size={28} className="text-gray-500 hover:text-gray-700" />
      </button>
    </section>
  );
};

export default CategoryProductcard;
