import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Urlcreation } from "../utils/urlcreation";
import ProductadminEdit from "./ProductadminEdit";
import Conformproductdelete from "./Conformproductdelete";

const Productcard = ({ data,fetchproduct }) => {
  const [openEdit, setOpenEdit] = useState(false);
const [opendelete,setOpendelete]=useState(false);
  //   const url= `product/${Urlcreation(data.name)}-${data._id}`
  return (
    <div className="p-2">
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden max-w-[100px] group">
        <div className="w-full h-24 bg-gray-100 flex items-center justify-center overflow-hidden">
          <img
            src={data?.image[0]}
            alt={""}
            className="h-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="p-2 space-y-0.5">
          <p className="text-gray-800 font-medium text-xs line-clamp-2 leading-tight">
            {data?.name}
          </p>

          <p className="text-gray-500 text-[11px]">{data?.unit}</p>

          <p className="text-green-600 font-semibold text-xs">₹{data?.price}</p>

          <div className="flex gap-1 mt-1">
            <button onClick={()=>setOpendelete(true)} className="flex-1 text-[10px] bg-red-200 text-red-600 py-0.5 rounded hover:bg-red-300 transition">
              Delete
            </button>
            <button
              onClick={() => setOpenEdit(true)}
              className="flex-1 text-[10px] bg-yellow-200 text-yellow-700 py-0.5 rounded hover:bg-yellow-300 transition"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
      {openEdit && (
        <ProductadminEdit data={data} close={() => setOpenEdit(false)} fetchproduct={fetchproduct} />
      )}



      {
        opendelete &&
          <Conformproductdelete close={() => setOpendelete(false)} data={data} fetchproduct={fetchproduct}/>
        
      }
    </div>
  );
};

export default Productcard;
