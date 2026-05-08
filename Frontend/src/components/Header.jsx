import React, { useEffect, useState } from "react";
import logo1 from "../assets/logo1.png";
import Search from "./Search";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import { FaCartArrowDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaUsersGear } from "react-icons/fa6";
import { FaSortDown } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";
import UserMenu from "./UserMenu";
import UserMobileMenu from "./UserMobileMenu";
import { BsCart4 } from "react-icons/bs";
import { useLocation } from "react-router-dom";
const Header = () => {
  const [usermenu, setUsermenu] = useState(false);
  // const [open,setoOpen]=useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((state) => state?.user);
  const cartitem = useSelector((state) => state?.cart.allCartitems);
  // console.log("user in store", user);
  const [noofquantityincart, setnumberofquantiryincart] = useState();

  useEffect(() => {
    const quantity = cartitem.reduce((total, current) => {
      return total + current.quantity;
    }, 0);
    setnumberofquantiryincart(quantity);
  }, [cartitem]);
  const handleMobilelogin = () => {
    if (!user._id) {
      navigate("/login");
      return;
    }
    navigate("/mobile-user");
  };

  useEffect(() => {
    setUsermenu(false);
  }, [location.pathname]);
  return (
    <header className="h-29 lg:h-20 bg-blue-200 z-50 relative border-t lg:shadow-md sticky top-0 flex flex-col items-center justify-center ">
      <div className="container flex items-center justify-between mx-auto px-3 lg:px-4 ">
        <Link to={"/"}>
          <div className="h-full">
            <img
              src={logo1}
              height={90}
              width={100}
              alt="logo"
              className="hidden lg:block"
            />

            <img
              src={logo1}
              height={90}
              width={90}
              alt="logo"
              className="lg:hidden"
            />
          </div>
        </Link>
        <div className="hidden lg:block">
          <Search />
        </div>

        <div className="flex items-center gap-3">
          {/* for mobile */}
          <div className="flex items-center justify-center gap-2">
            <Link to={"/cart"}>
              <div className="lg:hidden relative">
                <button className="">
                  <BsCart4 size={20} />
                </button>
                {noofquantityincart > 0 && (
                  <div className="absolute bg-yellow-300 top-0 -mt-1 left-2 ml-2 rounded-full h-4 w-4 flex items-center justify-center">
                    <p>{noofquantityincart}</p>
                  </div>
                )}
              </div>
            </Link>
            <button
              className="lg:hidden text-neutral-800 p-2 "
              onClick={handleMobilelogin}
            >
              <FaUser size={26} />
            </button>
          </div>

          {/* for laptops */}
          <div className="hidden lg:flex items-center gap-4">
            {user._id ? (
              <div className="relative cursor-pointer">
                <div
                  onClick={() => setUsermenu((preve) => !preve)}
                  className="flex items-center gap-1"
                >
                  <p>
                    <FaUsersGear size={26} />
                  </p>
                  {usermenu ? <FaCaretUp /> : <FaSortDown />}
                </div>
                {usermenu ? (
                  <div>
                    <div className="absolute top-12 right-0 z-[60] ">
                      <div className="bg-white p-4 rounded-md min-w-42 shadow-lg">
                        <UserMenu />
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              <Link to={"/login"}>
                <button className="bg-green-300 hover:bg-green-400 text-green-900 px-4 py-1 rounded-md font-medium">
                  Login
                </button>
              </Link>
            )}
            {/* Login Button - Light Green */}

            {/* Cart Button - Yellow */}
            <Link to={"/cart"}>
              <button className="flex items-center gap-3 bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded-md ">
                {/* Cart Icon */}
                <div className="text-neutral-800 text-xl">
                  <FaCartArrowDown />
                </div>

                {/* Cart Text */}
                <div className="text-sm text-neutral-900">
                  <p className="font-medium py-1">{`${noofquantityincart} Items`}</p>
                  {/* <p className="text-xs text-neutral-700"></p> */}
                </div>
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-2 mt-2 lg:hidden">
        <Search />
      </div>
    </header>
  );
};

export default Header;
