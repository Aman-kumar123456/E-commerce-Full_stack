import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Urlcreation } from "../utils/urlcreation";
import { Pricediscount } from "../utils/Pricediscount";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";
import toast from "react-hot-toast";
import { setCartitems } from "../Store/cartSlice.js";
import { useDispatch } from "react-redux";
import getcartitems from "../utils/fetchcartitem.js";
import { PriceInRupees } from "../utils/PriceInRupees.js";

const CategortProCard = ({ product }) => {
  const [Loading,setLoading]=useState(false);
  const productUrl = `/product/${Urlcreation(product.name)}-${product._id}`;

  const dispatch=useDispatch();
  const handleaddtocart=async(e)=>{
e.preventDefault();
e.stopPropagation();
try {
  setLoading(true)
  const cartresponse=await Axios({
    ...summaryApi.addtocart,
    data:{
      productId:product._id
    }
  })
  if(cartresponse.data.error){
    toast.error(cartresponse.data.message)
  }
  if(cartresponse.data.success){
    toast.success(cartresponse.data.message);
    // console.log("added to cart item is:",cartresponse.data.data);
    const fetchcartitems=await getcartitems()
    dispatch(setCartitems(fetchcartitems.data))
  }
} catch (error) {
  AxiosToastError(error);
}finally{
  setLoading(false)
}
  }
  return (
    <Link to={productUrl}>
      <div className="rounded-sm p-2 shadow-md w-full max-w-[155px] max-h-[240px] bg-white overflow-hidden">
        <div className="flex justify-center items-center -mt-2">
          <div className="w-20 h-28">
            <img
              src={product.image[0]}
              alt={product.name}
              className="w-full h-full object-contain object-scale-down "
            />
          </div>
        </div>

        <div className={`px-2 pt-0 pb-1 -mt-1 ${!product.discount && "mt-1.5"}  `}>
          {product.discount > 0 && (
           <div className="bg-green-600 text-white text-xs max-w-[90px] rounded-xl">
             <p className="ml-1 ">
              {`${product.discount}% Discount`}
            </p>
           </div>
          )}

          <p className="text-xs font-medium leading-tight line-clamp-2 text-left m-0">
            {product.name}
          </p>

          <div className="flex items-center justify-start gap-2">
            <p className="text-xs font-semibold text-green-600 m-0">
              {`${PriceInRupees(Pricediscount(product.price, product.discount))}`}
            </p>
            <p className="text-xs font-semibold bg-green-300 rounded-md px-2 text-white m-0">
              {product.unit}kg
            </p>
          </div>

          {product.stock != 0 ? (
            <button onClick={handleaddtocart} className="mt-0.5 w-full bg-yellow-400 hover:bg-yellow-500 text-black text-xs py-1 rounded-md">
              {Loading ?<p>Adding...</p>:<p>Add to cart</p>}
            </button>
          ) : (
            <p className="text-red-500 border-red-800 font-semibold bg-red-200 rounded text-xs border">
              Out of Stock
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CategortProCard;
