import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Divider from "./Divider";
import { logout } from "../Store/userSlice";
import { clearCart } from "../Store/cartSlice";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { FaEdit } from "react-icons/fa";


const UserMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const user =useSelector(state=>state?.user)

  // const handleclose = () => {
  //   close();
  // };
  const handlelogout = async () => {
    try {
      const response = await Axios({
        ...summaryApi.logout,
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        dispatch(logout());
        dispatch(clearCart());
        localStorage.clear();
        toast.success(response.data.message);
        // window.history.back();
        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
      // console.log(error);
    }

    // dispatch(logout());
    // dispatch(clearCart());
  };
  const user = useSelector((state) => state?.user);
  // console.log("user is:", user);
  return (
   <div className="w-56">
  <div className="px-3 py-2 border-b">
    <p className="text-sm text-gray-500">My Account</p>

    <div className="flex items-center justify-between">
      <p className="font-semibold text-gray-800">
        {user.name}
      </p>

      <Link to={"/dashboard/profile"}>
        <FaEdit className="text-blue-600 hover:text-blue-800 cursor-pointer" />
      </Link>
    </div>

    {user.role === "ADMIN" && (
      <p className="text-xs text-blue-600 mt-1">(Admin)</p>
    )}
  </div>

  <div className="flex flex-col text-sm py-2">

    {user.role === "ADMIN" && (
      <>
        <Link
          to="/dashboard/category"
          className="px-4 py-2 hover:bg-gray-100"
        >
          Category
        </Link>
        <Link
          to="/dashboard/subcategory"
          className="px-4 py-2 hover:bg-gray-100"
        >
          Subcategory
        </Link>
        <Link
          to="/dashboard/uploadproducts"
          className="px-4 py-2 hover:bg-gray-100"
        >
          Upload Product
        </Link>
        <Link
          to="/dashboard/products"
          className="px-4 py-2 hover:bg-gray-100"
        >
          Products
        </Link>
      </>
    )}

    <Link
      to="/dashboard/myorders"
      className="px-4 py-2 hover:bg-gray-100"
    >
      My Orders
    </Link>

    <Link
      to="/dashboard/myaddress"
      className="px-4 py-2 hover:bg-gray-100"
    >
      My Address
    </Link>

    <div className="border-t my-2"></div>

    <button
      onClick={handlelogout}
      className="text-left px-4 py-2 text-red-600 hover:bg-red-50"
    >
      Logout
    </button>
  </div>
</div>
  );
};

export default UserMenu;
