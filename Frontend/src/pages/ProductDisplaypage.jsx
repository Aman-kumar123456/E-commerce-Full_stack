import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError.js";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";
import toast from "react-hot-toast";
import images from "../assets/images.jpg";
import { FaChevronCircleLeft } from "react-icons/fa";
import { FaChevronCircleRight } from "react-icons/fa";
import { Pricediscount } from "../utils/Pricediscount.js";
import { useDispatch, useSelector } from "react-redux";
import { setCartitems } from "../Store/cartSlice.js";
import getcartitems from "../utils/fetchcartitem.js";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import updatecartitemsquantity from "../utils/updatecartItemsquantity.js";
import deletecartitems from "../utils/deletecartitems.js";
const ProductDisplaypage = () => {
  const [quantity, setquantity] = useState(0);
  const [findedproduct, setFindedproduct] = useState();
  const dispatch = useDispatch();
  const cartitems = useSelector((state) => state.cart.allCartitems);
  const [isitemavilableincart, setIsitemavilableincart] = useState(false);
  const params = useParams();
  const [data, setData] = useState();
  const [Loading, setLoading] = useState(false);
  const [image, setImage] = useState();
  const [dot, setDot] = useState();
  const [cartLoading, setcartLoading] = useState(false);

  const productid = params.product.split("-").slice(-1)[0];
  // console.log("product id is:",productid);

  const getproductdetails = async () => {
    try {
      setLoading(true);
      const getproductresponse = await Axios({
        ...summaryApi.getproductdetails,
        data: {
          id: productid,
        },
      });
      if (getproductresponse.data.errror) {
        toast.error(getproductresponse.data.message);
      }
      if (getproductresponse.data.success) {
        // toast.success(getproductresponse.data.message);
        // console.log("product details is:",getproductresponse.data.data);
        setData(getproductresponse.data.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getproductdetails();
  }, [params]);

  console.log("product details data is product:", data);

  useEffect(() => {
    if (data?.image?.length > 0) {
      setImage(data?.image[0]);
      setDot(0);
    }
  }, [data]);

  const handleNext = () => {
    if (!data?.image?.length) return;

    const nextIndex = (dot + 1) % data.image.length; // loop forward
    setDot(nextIndex);
    setImage(data.image[nextIndex]);
  };

  const handlePrev = () => {
    if (!data?.image?.length) return;

    const prevIndex = (dot - 1 + data.image.length) % data.image.length; // loop backward
    setDot(prevIndex);
    setImage(data.image[prevIndex]);
  };

  // rough work from my side try something there.....
  const handleaddtocart = async () => {
    try {
      setcartLoading(true);
      const cartresponse = await Axios({
        ...summaryApi.addtocart,
        data: {
          productId: productid,
        },
      });
      if (cartresponse.data.error) {
        toast.error(cartresponse.data.message);
      }
      if (cartresponse.data.success) {
        toast.success(cartresponse.data.message);
        // console.log("added to cart item is:",cartresponse.data.data);
        const fetchcartitems = await getcartitems();
        dispatch(setCartitems(fetchcartitems.data));
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setcartLoading(false);
    }
  };

  // check item in cart is avilable or not

  useEffect(() => {
    const checkcartitem = cartitems.some(
      (item) => item.productId._id === productid,
    );
    // console.log(checkcartitem);
    setIsitemavilableincart(checkcartitem);

    const productitemcard = cartitems.find(
      (item) => item.productId._id === productid,
    );
    setquantity(productitemcard?.quantity);
    setFindedproduct(productitemcard);
  }, [cartitems, params]);

  // decrease count
  const handledecreasequantity = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (quantity === 1) {
      await deletecartitems(findedproduct?._id);
      const fetchcartitems = await getcartitems();
      dispatch(setCartitems(fetchcartitems.data));
    } else {
      await updatecartitemsquantity(findedproduct?._id, quantity - 1);
      const fetchcartitems = await getcartitems();
      dispatch(setCartitems(fetchcartitems.data));
    }
  };

  // increase count
  const handleincreasequantity = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    await updatecartitemsquantity(findedproduct?._id, quantity + 1);

    const fetchcartitems = await getcartitems();
    dispatch(setCartitems(fetchcartitems.data));
  };
  return (
    <section className="bg-blue-100 min-h-screen p-4">
      <div className="  max-w-6xl mx-auto bg-blue-200 p-6 rounded-lg shadow-md">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            {/* Main Image */}
            <div className="border rounded-lg p-4 flex justify-center items-center bg-gray-50">
              <img
                src={image}
                alt={data?.name}
                className="h-72 object-contain"
              />
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-3">
              {data?.image?.map((img, index) => {
                return (
                  <div
                    key={index}
                    className={`h-3 w-3 ${
                      dot === index ? "bg-yellow-400" : "bg-gray-400"
                    } rounded-full`}
                  ></div>
                );
              })}
            </div>
            <div className="flex items-center justify-center gap-10">
              <button onClick={handlePrev} className="text-black">
                <FaChevronCircleLeft size={20} />
              </button>

              <div className="flex gap-3 mt-4  max-w-[420px] ">
                {data?.image?.map((image, index) => {
                  return (
                    <img
                      key={index}
                      src={image}
                      onClick={() => {
                        setImage(image);
                        setDot(index);
                      }}
                      alt="product-thumbnail"
                      className={`h-16 w-16 min-w-[64px] shadow-xl rounded-md object-contain p-1 cursor-pointer border-2 ${
                        dot === index
                          ? "border-yellow-400"
                          : "border-transparent"
                      }`}
                    />
                  );
                })}
              </div>

              <button onClick={handleNext} className="text-black">
                <FaChevronCircleRight size={20} />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold text-gray-800">
              {data?.name}
            </h1>

            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-green-600">
                {` ₹ ${Pricediscount(data?.price, data?.discount)}`}
              </span>

              {data?.discount > 0 && (
                <div>
                  <span className="text-lg text-gray-500 line-through">
                    {`₹${data?.price}`}
                  </span>

                  <span className="bg-green-100 text-green-700 px-2 py-1 text-sm rounded font-semibold">
                    {`${data?.discount}% OFF`}
                  </span>
                </div>
              )}
            </div>

            <p className="text-sm text-gray-600">
              <span className="font-medium">Stock:</span>{" "}
              {`${data?.stock} Available`}
            </p>

            <span className="text-md text-green-500">
              {`Quantity: ${data?.unit}`}
            </span>

            {data?.stock === 0 ? (
              <p className="text-red-700 font-semibold">Out of Stock</p>
            ) : (
              <div>
                {isitemavilableincart ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handledecreasequantity}
                      className=" flex items-center justify-center bg-yellow-400 min-w-10 max-w-80 hover:bg-yellow-500 text-black py-2 rounded-md font-medium transition  "
                    >
                      <FaMinus />
                    </button>

                    <p>{quantity}</p>
                    <button
                      onClick={handleincreasequantity}
                      className=" flex items-center justify-center bg-yellow-400  min-w-10 max-w-80 hover:bg-yellow-500 text-black py-2 rounded-md font-medium transition "
                    >
                      <FaPlus />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleaddtocart}
                    className="bg-yellow-400 min-w-40 max-w-60 hover:bg-yellow-500 text-black py-2 rounded-md font-medium transition"
                  >
                    {cartLoading ? <p>Adding...</p> : <p>Add to Cart</p>}
                  </button>
                )}
              </div>
            )}

            <div className="mt-4">
              <h2 className="font-semibold text-lg mb-2">Description</h2>

              <p className="text-gray-600 text-sm leading-relaxed">
                {data?.description}
              </p>
            </div>
            <div className="mt-4">
              <h2 className="font-semibold text-lg mb-2">Return Policy</h2>

              <p className="text-gray-600 text-sm">
                7 Days easy return. Product must be unused and in original
                packaging for return eligibility.
              </p>
            </div>

            <div className="mt-4">
              <h2 className="font-semibold text-lg mb-2">Safe Delivery</h2>

              <div className="flex mt-4">
                <img
                  src={images}
                  alt={images}
                  className="h-20 w-15 bg-white -mt-4"
                />
                <p className="text-gray-600 text-sm">
                  Product color may slightly vary due to photographic lighting
                  sources or your monitor settings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ProductDisplaypage;
