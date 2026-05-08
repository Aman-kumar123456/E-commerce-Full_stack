import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import toast, { Toaster } from "react-hot-toast";
import fetchUserdetails from "./utils/fetchuserDetails";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./Store/userSlice";
import fetchcategoryDetails from "./utils/fetchcategoryDetails";
import { setAllCategory } from "./Store/productSlice";
import fetchsubcategoryDetails from "./utils/fetchsubcategoryDetails";
import { setAllSubCategory } from "./Store/productSlice";
import { setCartitems } from "./Store/cartSlice.js";
import Axios from "./utils/Axios.js";
// import summaryApi from './common/summaryApi';
import getcartitems from "./utils/fetchcartitem.js";
import getAddress from "./utils/getAddress.js";
import { setAlladdress } from "./Store/addressSlice.js";
import getAllorders from "./utils/getallOrders.js";
import { setOrder } from "./Store/orderSlice.js";
function App() {
  const dispatch = useDispatch();

  // fetch userdetails
  const fetchuser = async () => {
    const fetchUser = await fetchUserdetails();
    // return fetchUser;
    // console.log(fetchUser.data);
    dispatch(setUserDetails(fetchUser.data));
  };

  // fetch categorydetails

  const fetchcategory = async () => {
    const fetchCategory = await fetchcategoryDetails();
    dispatch(setAllCategory(fetchCategory.data.data));
  };

  // fetch subcategory
  const fetchSubcategory = async () => {
    const fetsubcategory = await fetchsubcategoryDetails();
    dispatch(setAllSubCategory(fetsubcategory.data));
    // console.log("all uploaded subcategory is:",fetsubcategory.data)
  };

  // get carts items here.....

  const getallcartitems = async () => {
    const getcartitem = await getcartitems();
    dispatch(setCartitems(getcartitem.data));
  };

  //get all address here.....

  const getAllAddress = async () => {
    const getaddress = await getAddress();
    console.log("AllAddress is:", getaddress);
    dispatch(setAlladdress(getaddress.data));
  };

  // get all orders here.....

  const getallUserorders = async () => {
    const allorder = await getAllorders();
    dispatch(setOrder(allorder.data));
  };
  useEffect(() => {
    fetchuser();
    fetchcategory();
    fetchSubcategory();
    getallcartitems();
    getAllAddress();
    getallUserorders();
  }, []);
  return (
    <>
      <Header />
      <main className="min-h-[90vh]">
        {/* <p className='bg-amber-600 text-4lx text-white p-6'>Hello And Welcome in this Ecommerce Website</p> */}
        <Outlet />
      </main>

      <Footer />
      <Toaster />
    </>
  );
}

export default App;
