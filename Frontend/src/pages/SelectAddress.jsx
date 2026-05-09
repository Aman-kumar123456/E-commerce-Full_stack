import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pricediscount } from "../utils/Pricediscount.js";
import SetAddress from "../components/SetAddress";
import AxiosToastError from "../utils/AxiosToastError.js";
import Axios from "../utils/Axios.js";
import summaryApi from "../common/summaryApi";
import toast from "react-hot-toast";
import getcartitems from "../utils/fetchcartitem.js";
import { setCartitems } from "../Store/cartSlice";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import getAllorders from "../utils/getallOrders";
import { setOrder } from "../Store/orderSlice";
import { PriceInRupees } from "../utils/PriceInRupees.js";
const SelectAddress = () => {
  const [CountCartItems, setCountCartItems] = useState(0);
  const cartitems = useSelector((state) => state?.cart?.allCartitems);
  const [TotalCartPrice, setTotalCartPrice] = useState(0);
  const [DiscountedTotalPrice, setDiscountedTotalPrice] = useState(0);
  const [OpenAddress, setOpenaddress] = useState(false);
  const allAddress = useSelector((state) => state?.address?.allAddress);
  // console.log("All address is:", allAddress);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectAddress, setSelectAddress] = useState(0);
  console.log("Select address is:", allAddress[selectAddress]);

  const handleCashonDeliveryOrder = async () => {
    try {
      const orderresponse = await Axios({
        ...summaryApi.addorder,
        data: {
          allItems: cartitems,
          delivery_addressId: allAddress[selectAddress]._id,
          subTotalAmt: DiscountedTotalPrice,
          totalAmt: TotalCartPrice,
        },
      });
      if (orderresponse.data.error) {
        toast.error(orderresponse.data.message);
      }
      if (orderresponse.data.success) {
        toast.success(orderresponse.data.message);
        console.log("orderresponse", orderresponse);
        const getcart = await getcartitems();
        dispatch(setCartitems(getcart.data));
        const allorder = await getAllorders();
        dispatch(setOrder(allorder.data));
        navigate("/success", {
          state: {
            text: "Order",
          },
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleOnlinepayment = async () => {
    try {
      if (!allAddress?.[selectAddress]?._id) {
        toast.error("Please select an address first");
        return;
      }

      const Stripepublickey = import.meta.env.VITE_STRIPE_PUBLICKEY;
      console.log("Stripe public key:", Stripepublickey);
      const stripe = await loadStripe(Stripepublickey);

      if (!stripe) {
        toast.error("Stripe failed to load");
        return;
      }

      const response = await Axios({
        ...summaryApi.paymentsession_url,
        data: {
          allItems: cartitems,
          delivery_addressId: allAddress[selectAddress]._id,
          subTotalAmt: DiscountedTotalPrice,
          totalAmt: TotalCartPrice,
        },
      });

      const responseData = response.data;
      console.log("Stripe session response:", responseData);

      if (!responseData?.id) {
        toast.error(responseData?.message || "Unable to create Stripe session");
        return;
      }

      const redirectUrl = responseData.url || responseData.session?.url;
      if (redirectUrl) {
        console.log("Redirecting using session URL:", redirectUrl);
        window.location.href = redirectUrl;
        return;
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId: responseData.id,
      });

      if (error) {
        console.error("Stripe redirect error:", error);
        toast.error(error.message || "Stripe redirect failed");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

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

  return (
    <section className="bg-blue-50">
      <div className="container mx-auto p-4 flex flex-col lg:flex-row w-full gap-5 justify-between">
        <div className="w-full">
          {/***address***/}
          <h3 className="text-lg font-semibold">Choose your address</h3>
          <div className="bg-white  grid gap-4 max-h-[70vh] overflow-y-auto">
            {allAddress.map((address, index) => {
              return (
                <label htmlFor={"address" + index}>
                  <div className=" rounded p-3 flex gap-3 hover:bg-green-50 shadow-sm">
                    <div>
                      <input
                        id={"address" + index}
                        type="radio"
                        value={index}
                        onChange={(e) => setSelectAddress(e.target.value)}
                        name="address"
                      />
                    </div>
                    <div>
                      <p>{address.address_line}</p>
                      <p>{address.city}</p>
                      <p>{address.state}</p>
                      <p>
                        {address.country} - {address.pincode}
                      </p>
                      <p>{address.mobile}</p>
                    </div>
                  </div>
                </label>
              );
            })}

            <div
              onClick={() => setOpenaddress(true)}
              className="h-10 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold  flex justify-center items-center cursor-pointer sticky bottom-0"
            >
              Add address
            </div>
          </div>
        </div>

        <div className="w-full max-w-md bg-white py-4 px-2">
          {/**summary**/}
          <h3 className="text-lg font-semibold">Summary</h3>
          <div className="bg-white p-4">
            <h3 className="font-semibold">Bill details</h3>
            <div className="flex gap-4 justify-between ml-1">
              <p>Items total</p>
              <p className="flex items-center gap-2">
                <span className="line-through text-neutral-400">
                  {PriceInRupees(TotalCartPrice)}
                </span>
                <span>{PriceInRupees(DiscountedTotalPrice)}</span>
              </p>
            </div>
            <div className="flex gap-4 justify-between ml-1">
              <p>Quntity total</p>
              <p className="flex items-center gap-2">{CountCartItems} item</p>
            </div>
            <div className="flex gap-4 justify-between ml-1">
              <p>Delivery Charge</p>
              <p className="flex items-center gap-2">Free</p>
            </div>
            <div className="font-semibold flex items-center justify-between gap-4">
              <p>Grand total</p>
              <p>{PriceInRupees(DiscountedTotalPrice)}</p>
            </div>
          </div>
          <div className="w-full flex flex-col gap-4">
            <div className="flex flex-col">
              <button
                disabled
                onClick={handleOnlinepayment}
                className="py-2 px-4 bg-yellow-400 hover:bg-yellow-500 rounded text-white font-semibold"
              >
                Online Payment
              </button>
              <p className="text-red-400">Online Payment is currently Unavilable</p>
            </div>

            <button
              onClick={handleCashonDeliveryOrder}
              className="py-2 px-4 border-2 border-yellow-400 font-semibold text-yellow-500 hover:bg-yellow-500 hover:text-white"
            >
              Cash on Delivery
            </button>
          </div>
        </div>
      </div>
      {OpenAddress && <SetAddress close={() => setOpenaddress(false)} />}
    </section>
  );
};

export default SelectAddress;
