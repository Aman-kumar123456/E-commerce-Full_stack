import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Searchpage from "../pages/Searchpage";
import Register from "../pages/Register";
import Forgotpassword from "../pages/Forgotpassword";
import VerifyOtp from "../pages/VerifyOtp";
import Resetpassword from "../pages/Resetpassword";
import UserMobileMenu from "../components/UserMobileMenu";
import Dashboard from "../Layout/Dashboard";
import Profile from "../pages/Profile";
import Myorders from "../pages/Myorders";
import Myaddresses from "../pages/Myaddresses";
import Category from "../pages/Category";
import Subcategory from "../pages/Subcategory";
import Uploadproducts from "../pages/Uploadproducts";
import Productsadmin from "../pages/Productsadmin";
import Adminpremission from "../Layout/Adminpremission";
import CateWiseSubcategory from "../pages/CateWiseSubcategory";
import ProductDisplaypage from "../pages/ProductDisplaypage";
import Categorypage from "../pages/Categorypage";
import Displaycartitems from "../pages/Displaycartitems";
import SelectAddress from "../pages/SelectAddress";
import SuccessOrder from "../pages/SuccessOrder";
import CancelOrder from "../components/CancelOrder";
const router=createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {
                path:"",
                element:<Home/>
            },
            {
                path:"login",
                element:<Login/>
            },
            {
                path:"search",
                element:<Searchpage/>
            },
             {
                path:"register",
                element:<Register/>
            },
            {
                path:'forgot-password',
                element:<Forgotpassword/>
            },
            {
                path:'verify-otp',
                element:<VerifyOtp/>
            },
            {
                path:'reset-password',
                element:<Resetpassword/>
            },
            {
                path:'mobile-user',
                element:<UserMobileMenu/>
            },
            {
                path:'dashboard',
                element:<Dashboard/>,
                children:[
                    {
                        path:'profile',
                        element:<Profile/>
                    },
                    {
                        path:'myorders',
                        element:<Myorders/>
                    },
                    {
                        path:'myaddress',
                        element:<Myaddresses/>
                    },
                    {
                        path:'category',
                        element:<Adminpremission><Category/></Adminpremission>
                    },
                    {
                        path:'subcategory',
                        element:<Adminpremission><Subcategory/></Adminpremission>
                    },
                    {
                        path:'uploadproducts',
                        element:<Adminpremission><Uploadproducts/></Adminpremission>
                    },
                    {
                        path:'products',
                        element:<Adminpremission><Productsadmin/></Adminpremission>
                    }
                ]
            },
            {
                path:":category",
                element:<Categorypage/>,
                children:[
                    {
                        path:":subcategory",
                        element:<CateWiseSubcategory/>
                    }
                ]
            },
            {
                path:"product/:product",
                element:<ProductDisplaypage/>
            },
            {
                path:'cart',
                element:<Displaycartitems/>
            },
            {
                path:'select-address',
                element:<SelectAddress/>
            },
            {
                path:'success',
                element:<SuccessOrder/>
            },
            {
                path:'cancel',
                element:<CancelOrder/>
            }

        ]
    }
])
export default router