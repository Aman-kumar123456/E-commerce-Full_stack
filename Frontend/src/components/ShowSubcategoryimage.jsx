import React from 'react'
import { IoMdClose } from "react-icons/io";

const ShowSubcategoryimage = ({close,Image}) => {
  return (
  <div className="bg-black/70 fixed right-0 top-0 left-0 bottom-0 z-50 flex items-center justify-center p-4">
  
  <div className="relative bg-white rounded-md shadow-sm max-w-xl w-full p-4 flex items-center justify-center">
    
    <IoMdClose
      onClick={close}
      className="absolute top-3 right-3 text-2xl text-gray-600 hover:text-red-500 cursor-pointer transition duration-200"
    />

    <img
      src={Image}
      alt="View Image"
      className="max-h-[80vh] w-auto rounded-sm object-contain"
    />

  </div>

</div>
  );
}

export default ShowSubcategoryimage
