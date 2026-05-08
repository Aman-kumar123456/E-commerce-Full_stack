import React, { useState } from "react";
import AxiosToastError from "../utils/AxiosToastError.js";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";
import toast from "react-hot-toast";
import { IoCloseCircleSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { IoIosClose } from "react-icons/io";
import fetchsubcategoryDetails from "../utils/fetchsubcategoryDetails";
import { setAllSubCategory } from "../Store/productSlice";

const Uploadsubcategory = ({ close,fetchsubcategory }) => {
  const [Loading ,setLoading]=useState(false)
  const [data, setData] = useState({
    name: "",
    image: "",
    category: [],
  });
  // console.log("subcategory", data);
  const dispatch=useDispatch();

  const category = useSelector((state) => state?.product.allCategory);
  // console.log("category from in subcategory page:", category);
  const handlechange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleremovecategory = (categoryId) => {
    const findcategory = data.category.findIndex((el) => el._id === categoryId);
  data.category.splice(findcategory, 1);
    setData((preve) => {
      return {
        ...preve
      };
    });
    // console.log("category in subcategory:",data);
  };

  const handleselectchange = (e) => {
    const value = e.target.value;
    const selectcategory = category.find((el) => el._id === value);
    setData((preve) => {
      return {
        ...preve,
        category: [...preve.category, selectcategory],
      };
    });
  };

  const handlesubcategorysubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...summaryApi.addsubcategory,
        data
      });

      if(response.data.error){
        toast.error(response.data.message)
      }
      if(response.data.success){
        toast.success(response.data.message);
        const addsubcategory=await fetchsubcategoryDetails();
        dispatch(setAllSubCategory(addsubcategory.data))
        fetchsubcategory();
        close();
        
              // console.log("subcategory uploaded data is:",response.data.data)

      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleUploadavatar = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true)
      const imageurlresponse = await Axios({
        ...summaryApi.uploadImage,
        data: formData,
      });
      if (imageurlresponse.data.error) {
        toast.error(imageurlresponse.data.message);
      }
      if (imageurlresponse.data.success) {
        toast.success(imageurlresponse.data.message);
        setData((preve)=>{
          return{
            ...preve,
            image:imageurlresponse.data.data.url
          }
        })
        // dispatch subcategory is here...
      }
    } catch (error) {
      AxiosToastError(error);
    }finally{
      setLoading(false)
    }
  };
  return (
    <section className="fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center bg-gray-700 opacity-90 z-50 ">
      <div className="bg-white p-2 rounded-sm shadow-sm max-w-sm w-full relative">
        <div
          className="absolute top-1 right-2 cursor-pointer text-gray-600 hover:text-red-500"
          onClick={close}
        >
          <IoCloseCircleSharp size={26} />
        </div>

        <div className="text-xl font-semibold mb-4">Upload Sub Category</div>

        <form onSubmit={handlesubcategorysubmit} className="flex flex-col">
          <div className="flex flex-col">
            <label htmlFor="categoryname" className="font-medium text-gray-700">
              Sub Category Name
            </label>

            <input
              type="text"
              id="categoryname"
              placeholder="Enter Subcategory name"
              name="name"
              value={data.name}
              onChange={handlechange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="productImage" className="font-medium text-gray-700">
              Product Image
            </label>

            <div className="border-2 border-gray-300 rounded-sm p-4 text-center">
              <img
                src={data.image}
                alt="Product Image"
                className="w-32 h-20 object-cover mx-auto mb-2 rounded-md bg-blue-50"
              />

              <label htmlFor="uploadavatar">
                <div className="text-sm bg-yellow-400 p-1 rounded-md cursor-pointer hover:bg-yellow-500">
                 {Loading ?"Uploading..." : "Uplaoad Image"} 
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
          {/* <div> */}
          <label className="font-medium text-gray-700">Select Category</label>

          <div className="flex flex-wrap gap-2 mt-1 max-h-15 overflow-y-auto border border-gray-300 rounded-md p-1 bg-gray-50">
            {data.category.map((cat, index) => {
              return (
                <p
                  key={cat._id + "subcategory"}
                  className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full border border-blue-200 hover:bg-blue-200 transition"
                >
                  {cat.name}

                  <IoIosClose
                    size={18}
                    className="cursor-pointer hover:text-red-500 transition"
                    onClick={() => handleremovecategory(cat._id)}
                  />
                </p>
              );
            })}
          </div>

          <select
            onChange={handleselectchange}
            className="mt-3 w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
          >
            <option value={""} disabled >
              Select category
            </option>

            {category.map((item, index) => {
              return (
                <option value={item?._id} key={item?._id + "subcategory"}>
                  {item.name}
                </option>
              );
            })}
          </select>
          {/* </div> */}

          <button
            type="submit"
            className="bg-yellow-400 text-white py-2 rounded-md font-medium hover:bg-yellow-500"
          >
            Submit SubCategory
          </button>
        </form>
      </div>
    </section>
  );
};

export default Uploadsubcategory;
