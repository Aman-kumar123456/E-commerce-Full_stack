import React, { useState } from 'react'
import Axios from '../utils/Axios'
import summaryApi from '../common/summaryApi'
import AxiosToastError from '../utils/AxiosToastError.js'
import toast from 'react-hot-toast'
import { IoCloseCircleSharp } from 'react-icons/io5'
import fetchcategoryDetails from '../utils/fetchcategoryDetails'
import { setAllCategory } from '../Store/productSlice'
import { useDispatch } from 'react-redux'

const Editcategory = ({close,autofilleditdata}) => {
  const dispatch=useDispatch();
const [data,setData]=useState({
    _id:autofilleditdata._id || "",
    name:autofilleditdata.name||"",
    image:autofilleditdata.image ||""
})

const handlechange=(e)=>{
const {name,value}=e.target
setData((preve)=>{
    return{
        ...preve,
        [name]:value
    }
})
}





const handlecategorysubmit=async(e)=>{
e.preventDefault();

try {
    const updateresponse= await Axios({
        ...summaryApi.updatecategory,
        data
    })
if(updateresponse.data.error){
    toast.error(updateresponse.data.message)
}

if(updateresponse.data.success){
    toast.success(updateresponse.data.message);
    // fetchcategory();  // ✅ Call the refresh function passed from parent
    close();
     const response = await fetchcategoryDetails();

        // update redux
        dispatch(setAllCategory(response.data.data));
}
} catch (error) {
    AxiosToastError(error);
}
}



const handleUploadavatar=async(e)=>{
 const file=e.target.files[0]

 const formData=new FormData()
 formData.append("image",file)

 try {
    const response =await Axios({
        ...summaryApi.uploadImage,
        data:formData
    })
    if(response.data.error){
        toast.error(response.data.message);
    }
    if(response.data.success){
        toast.success(response.data.message)
        setData((preve)=>{
            return{
                ...preve,
                image:response.data.data.url
            }
        })
    }
 } catch (error) {
    AxiosToastError(error)
 }
}
  return (
   <section className="fixed inset-0 flex items-center justify-center bg-neutral-500  z-50 p-4">
         <div className="bg-white p-4 rounded-sm shadow-md max-w-md w-full relative">
           <div
             className="absolute top-2 right-2 cursor-pointer text-gray-600 hover:text-red-500"
             onClick={close}
           >
             <IoCloseCircleSharp size={26} />
           </div>
   
           <div className="text-xl font-semibold mb-4">Upload Category</div>
   
           <form onSubmit={handlecategorysubmit} className="flex flex-col gap-4">
             <div className="flex flex-col gap-1">
               <label htmlFor="categoryname" className="font-medium text-gray-700">
                 Category Name
               </label>
   
               <input
                 type="text"
                 id="categoryname"
                 placeholder="Enter category name"
                 name="name"
                 value={data.name}
                 onChange={handlechange}
                 className="border border-gray-300 rounded-md px-3 py-2 autofocus"
               />
             </div>
   
             <div className="flex flex-col gap-2">
               <label htmlFor="productImage" className="font-medium text-gray-700">
                 Product Image
               </label>
   
               <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                 <img
                   src={data.image}
                   alt="preview"
                   className="w-32 h-32 object-cover mx-auto mb-2 rounded-md"
                 />
   
                 <label htmlFor="uploadavatar">
                   <div className="text-sm bg-yellow-400 p-1 rounded-md cursor-pointer hover:bg-yellow-500">
                     Uplaoad Profile
                   </div>
   
                   <input
                     type="file"
                     id="uploadavatar"
                     className="hidden"
                     onChange={handleUploadavatar}
                   />
                 </label>
               </div>
             </div>
   
             <button
               type="submit"
               className="bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition"
             >
               Submit Category
             </button>
           </form>
         </div>
       </section>
  )
}

export default Editcategory
