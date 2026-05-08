import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pricediscount } from "../utils/Pricediscount.js";
// import {empty-cart}  from '../assets/empty-cart.png'
import emptycart from "../assets/emptycart.png";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import updatecartitemsquantity from "../utils/updatecartItemsquantity.js";
import getcartitems from "../utils/fetchcartitem.js";
import { setCartitems } from "../Store/cartSlice.js";
import deletecartitems from "../utils/deletecartitems.js";
import { useNavigate } from "react-router-dom";
import { PriceInRupees } from "../utils/PriceInRupees.js";
const Displaycartitems = () => {
  const [TotalCartPrice, setTotalCartPrice] = useState(0);
  const [DiscountedTotalPrice, setDiscountedTotalPrice] = useState(0);
  const cartitems = useSelector((state) => state?.cart?.allCartitems);
  const [CountCartItems, setCountCartItems] = useState(0);
  //   console.log("all cart items is:", cartitems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  console.log("user is:", user);

  //hum is logic ko context api file me bhi rakh sakte hai ,taki agar iska yani
  //total price or totaldiscounted price ka kahi or jarurat pare to direct use kar sakte hai itna sab karne ka jarurat na pare.
  useEffect(() => {
    const totalprice = cartitems.reduce((total, currentitem) => {
      return total + currentitem.productId.price * currentitem.quantity;
    }, 0);
    setTotalCartPrice(totalprice);
  }, [cartitems]);

  // total discountprice
  useEffect(() => {
    const totaldiscountedprice = cartitems.reduce((total, currentitem) => {
      return (
        total +
        Pricediscount(
          currentitem.productId.price,
          currentitem.productId.discount,
        ) *
          currentitem.quantity
      );
    }, 0);
    setDiscountedTotalPrice(totaldiscountedprice);
  }, [cartitems]);

  // count cart items here.....

  useEffect(() => {
    const totalcountcartitem = cartitems.reduce((total, currentitem) => {
      return total + currentitem.quantity;
    }, 0);
    setCountCartItems(totalcountcartitem);
  }, [cartitems]);
  //   console.log("total cart itms is:",CountCartItems );

  const handledecreasequantity = async (cartItemId, quantity) => {
    if (quantity === 1) {
      await deletecartitems(cartItemId);
    } else {
      await updatecartitemsquantity(cartItemId, quantity - 1);
    }
    const fetchcartitems = await getcartitems();
    dispatch(setCartitems(fetchcartitems.data));
  };

  const handleincreasequantity = async (cartItemId, quantity) => {
    await updatecartitemsquantity(cartItemId, quantity + 1);
    const fetchcartitems = await getcartitems();
    dispatch(setCartitems(fetchcartitems.data));
  };

  // delete items to cart

  const handledeleteitemtocart = async (cartitemId) => {
    const deleteitemfromcart = await deletecartitems(cartitemId);
    const fetchcartitems = await getcartitems();
    dispatch(setCartitems(fetchcartitems.data));
  };

  const RedirectToPayment = () => {
    if (user._id) {
      navigate("/select-address");
    }
  };
  return (
    <section className="min-h-screen flex flex-col bg-gray-100">
      <div className="w-full h-12 flex items-center bg-white shadow-sm px-4">
        <h2 className="font-semibold text-lg sm:text-xl">My Cart</h2>
      </div>

      {CountCartItems ? (
        <>
          <div className="bg-blue-100 w-auto mx-3 mt-2 h-10 py-1 px-3 rounded-full text-blue-600 flex items-center justify-start">
            <p className="text-sm sm:text-base font-medium text-center">
              {`Your total saving :   ${PriceInRupees(TotalCartPrice - DiscountedTotalPrice)}`}
            </p>
          </div>

          <div className="flex-1 p-3 sm:p-4 mb-28 sm:mb-20">
            <div className="bg-white shadow-md rounded-md p-4 min-h-[300px]  flex flex-col gap-4">
              {cartitems.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="w-full flex items-center justify-between gap-4 rounded-md p-3"
                  >
                    <div className="flex-shrink-0">
                      <img
                        src={item?.productId.image[0]}
                        alt="ItemImage"
                        className="h-20 w-20 object-cover rounded shadow-xl"
                      />
                    </div>

                    <div className="flex-1">
                      <p className="font-medium">{item?.productId.name}</p>
                      <p className="text-sm text-gray-500">
                        {item?.productId.unit}
                      </p>

                      <div className="flex items-center gap-2">
                        <p className="text-green-600 font-semibold">
                           {" "}
                          {PriceInRupees(Pricediscount(
                            item?.productId.price,
                            item?.productId.discount,
                          ))}
                        </p>
                        <p className="line-through text-gray-400 text-sm">
                            {item?.productId.price}
                        </p>
                        {item?.productId.discount > 0 && (
                          <p className="text-green-600 font-semibold text-sm bg-green-200 rounded p-1">{`${item?.productId.discount}% Discount`}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-4">
                      <button
                        onClick={() => handledeleteitemtocart(item?._id)}
                        className="bg-red-200 rounded p-1 text-red-500 text-sm font-semibold"
                      >
                        Remove
                      </button>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            handledecreasequantity(item?._id, item?.quantity)
                          }
                          className=" flex items-center justify-center bg-yellow-400 min-w-10 max-w-80 hover:bg-yellow-500 text-black py-2 rounded-md font-medium transition  "
                        >
                          <FaMinus />
                        </button>

                        <p>{item?.quantity}</p>
                        <button
                          onClick={() =>
                            handleincreasequantity(item?._id, item?.quantity)
                          }
                          className=" flex items-center justify-center bg-yellow-400  min-w-10 max-w-80 hover:bg-yellow-500 text-black py-2 rounded-md font-medium transition "
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

  
          <div className="mx-3 mb-32">
            <div className="bg-white shadow-md rounded-md p-4 flex flex-col gap-3">
              <h3 className="font-semibold text-lg border-b pb-2">
                Price Details
              </h3>

              <div className="flex justify-between text-sm sm:text-base">
                <span>Total Price</span>
                <span>  {PriceInRupees(TotalCartPrice)}</span>
              </div>

              <div className="flex justify-between text-sm sm:text-base text-green-600">
                <span>Discount</span>
                <span>
                  -   {PriceInRupees(TotalCartPrice - DiscountedTotalPrice)}
                </span>
              </div>

              <div className="flex justify-between text-sm sm:text-base">
                <span>Total Items</span>
                <span>{CountCartItems}</span>
              </div>

              <div className="flex justify-between text-sm sm:text-base">
                <span>Delivery Fee</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>

              <div className="border-t pt-3 flex justify-between font-semibold text-base sm:text-lg">
                <span>Total Amount</span>
                <span className="text-green-600">
                    {PriceInRupees(DiscountedTotalPrice)}
                </span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="h-[60vh] w-full flex flex-col items-center justify-center gap-8">
            <img src={emptycart} alt="CartImage" className="h-40 w-40" />

            <button
              onClick={() => navigate("/")}
              className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 text-black font-semibold rounded-md w-40 text-center mt-10"
            >
              Start Shopping
            </button>
          </div>
        </>
      )}

      {CountCartItems && (
        <>
          <div className="fixed bottom-0 left-0 w-full bg-white shadow-md border-t z-50">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-6 py-3">
              <p className="font-semibold text-sm sm:text-lg flex flex-wrap items-center justify-center sm:justify-start gap-2 text-center sm:text-left">
                <span>Total Item Price:</span>

                <span className="text-green-600 font-bold">
                    {PriceInRupees(DiscountedTotalPrice)}
                </span>

                <span className="line-through text-gray-400 text-sm sm:text-base font-normal">
                    {TotalCartPrice}
                </span>
              </p>

              <button
                onClick={RedirectToPayment}
                className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 transition px-5 py-2 rounded-md font-semibold"
              >
                Place Order
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Displaycartitems;
