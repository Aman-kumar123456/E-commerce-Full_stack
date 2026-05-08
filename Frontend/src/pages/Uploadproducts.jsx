import React, { useState } from "react";
import { useSelector } from "react-redux";
import { IoCloudUpload } from "react-icons/io5";
import AxiosToastError from "../utils/AxiosToastError.js";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import sweetalert from "../utils/Sweetalet.js";

const Uploadproducts = () => {
  const allcategory = useSelector((state) => state?.product.allCategory);
  const allsubcategory = useSelector((state) => state.product.allSubCategory);
  // console.log("subcategory coming from redux ", allsubcategory);
  const [data, setData] = useState({
    name: "",
    image: [],
    category: [],
    subCategory: [],
    unit: "",
    stock: "",
    price: "",
    discount: "",
    description: "",
    more_details: {},
  });

  const handlechange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleremoveimage = (index) => {
    data.image.splice(index, 1);
    setData((preve) => {
      return {
        ...preve,
      };
    });
  };

  const handleaddcategory = (e) => {
    const value = e.target.value;
    const categorydata = allcategory.find((el) => el._id === value);
    setData((preve) => {
      return {
        ...preve,
        category: [...preve.category, categorydata],
      };
    });
    // console.log("categorys is:", data.category);
  };
  // subcategory
  const handleaddSubcategory = (e) => {
    const value = e.target.value;
    const categorydata = allsubcategory.find((el) => el._id === value);
    setData((preve) => {
      return {
        ...preve,
        subCategory: [...preve.subCategory, categorydata],
      };
    });
    // console.log("categorys is:", data.category);
  };

  const uploadimagehndler = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await Axios({
        ...summaryApi.uploadImage,
        data: formData,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);

        setData((preve) => {
          return {
            ...preve,
            image: [...preve.image, response.data.data.url],
          };
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const deletecategoryfromproduct = (categoryId) => {
    const deletecategory = data.category.findIndex(
      (el) => el._id === categoryId,
    );
    data.category.splice(deletecategory, 1);
    setData((preve) => {
      return {
        ...preve,
      };
    });
  };

  // subcategory
  const deleteSubcategoryfromproduct = (categoryId) => {
    const deletecategory = data.subCategory.findIndex(
      (el) => el._id === categoryId,
    );
    data.subCategory.splice(deletecategory, 1);
    setData((preve) => {
      return {
        ...preve,
      };
    });
  };




  const handlesubmit=async(e)=>{
e.preventDefault();

try {
  const response=await Axios({
...summaryApi.addproduct,
data
  })
  if(response.data.error){
    toast.error(response.data.message);
  }
  if(response.data.success){
    sweetalert(response.data.message);
    setData({
       name: "",
    image: [],
    category: [],
    subCategory: [],
    unit: "",
    stock: "",
    price: "",
    discount: "",
    description: "",
    more_details: {},
    })
  }
  // console.log("product uploaded",response.data)
} catch (error) {
  AxiosToastError(error);
}

// console.log("data is:",data);
  }

  return (
    <section className="p-6 bg-gray-100 min-h-screen w-full">
      {/* Header */}
      <div className="flex items-center justify-between bg-white px-6 py-4 rounded-xl shadow-md mb-6">
        <h2 className="text-xl font-semibold text-gray-700">Upload Product</h2>
      </div>

      <div className="bg-white w-full  p-2 max-w-3xl mx-auto">
        <form onSubmit={handlesubmit} className="flex flex-col gap-5">
          {/* Name */}
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="font-medium text-gray-700">
              Product Name
            </label>

            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your product name"
              value={data.name}
              onChange={handlechange}
              className="border border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="description" className="font-medium text-gray-700">
              Description
            </label>

            <textarea
              id="description"
              name="description"
              placeholder="Enter your product description"
              value={data.description}
              rows={3}
              required
              onChange={handlechange}
              className="border border-gray-300 rounded-sm px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-medium text-gray-700">Product Images</p>

            <label htmlFor="image">
              <div className="w-full h-28 bg-blue-100 rounded-sm flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 transition">
                <IoCloudUpload size={28} className="text-blue-500" />

                <span className="text-sm text-gray-600 mt-1">
                  Click to Upload Image
                </span>

                <input
                  type="file"
                  id="image"
                  hidden
                  onChange={uploadimagehndler}
                />
              </div>
            </label>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 mt-3">
              {data.image.map((img, index) => {
                return (
                  <div
                    key={index}
                    className="relative border rounded-sm overflow-hidden group"
                  >
                    <img
                      src={img}
                      alt={img}
                      className="h-24 w-full object-cover"
                    />

                    <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition">
                      <button
                        onClick={() => handleremoveimage(index)}
                        type="button"
                        className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                      >
                        <MdDelete size={18} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-700">Category:</label>

            <div className="flex flex-wrap  items-center gap-2 border border-gray-300 rounded-sm p-3 bg-gray-50">
              {/* Selected Categories */}
              {data.category.map((cata, index) => {
                return (
                  <div
                    key={cata._id + "category"}
                    className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm shadow-sm"
                  >
                    <p value={cata._id}>{cata.name}</p>

                    <IoCloseSharp
                      onClick={() => deletecategoryfromproduct(cata._id)}
                      className="cursor-pointer hover:text-red-500 transition"
                    />
                  </div>
                );
              })}

              {/* Select Dropdown */}
              <select
                onChange={handleaddcategory}
                className="border border-gray-300 rounded-sm px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value={""} disabled>
                  Select Category
                </option>

                {allcategory.map((cat, index) => {
                  return (
                    <option value={cat._id} key={cat._id + "category"}>
                      {cat.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          {/* subcategory */}

          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-700">SubCategory:</label>

            <div className={`flex items-center gap-2 border border-gray-300 rounded-lg p-3 bg-gray-50 ${data.category.length > 0 ? 'flex-wrap' : ''}`}>
              {/* Selected Categories */}
              {data.subCategory.map((cata, index) => {
                return (
                  <div
                    key={cata._id + "category"}
                    className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm shadow-sm"
                  >
                    <p value={cata._id}>{cata.name}</p>

                    <IoCloseSharp
                      onClick={() => deleteSubcategoryfromproduct(cata._id)}
                      className="cursor-pointer hover:text-red-500 transition"
                    />
                  </div>
                );
              })}

              {/* Select Dropdown */}
              <select
                onChange={handleaddSubcategory}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value={""} disabled>
                  Select Category
                </option>

                {allsubcategory.map((cat, index) => {
                  return (
                    <option value={cat._id} key={cat._id + "category"}>
                      {cat.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="unit" className="font-medium text-gray-700">
              Product Unit
            </label>

            <input
              type="text"
              id="unit"
              name="unit"
              placeholder="Enter your product unit"
              value={data.unit}
              onChange={handlechange}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="stock" className="font-medium text-gray-700">
              No of Stock
            </label>

            <input
              type="Number"
              id="stock"
              name="stock"
              placeholder="Enter your product stock"
              value={data.stock}
              onChange={handlechange}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="price" className="font-medium text-gray-700">
              price
            </label>

            <input
              type="Number"
              id="price"
              name="price"
              placeholder="Enter your product price"
              value={data.price}
              onChange={handlechange}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="discount" className="font-medium text-gray-700">
              discount
            </label>

            <input
              type="Number"
              id="discount"
              name="discount"
              placeholder="Enter your product discount"
              value={data.discount}
              onChange={handlechange}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>




                    <button
            type="submit"
            className="mt-4 bg-yellow-400 text-black font-medium py-2 rounded-lg hover:bg-yellow-500 transition"
          >
            Upload Product
          </button>
        </form>
      </div>
    </section>
  );
};

export default Uploadproducts;
