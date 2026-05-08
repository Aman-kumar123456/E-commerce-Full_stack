import React from "react";
import UserMenu from "./UserMenu";
import { GiCrossMark } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const UserMobileMenu = () => {
  const navigate=useNavigate();
  return (
    <div className="bg-white h-full w-full py-5">
      <button onClick={()=>navigate(-1)} className=" block wl-auto w-fit" >
        <GiCrossMark />
      </button>
      <div className="container mx-auto">
        <UserMenu />
      </div>
    </div>
  );
};

export default UserMobileMenu;
