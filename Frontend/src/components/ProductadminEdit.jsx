import React, { useState } from "react";
import { useSelector } from "react-redux";
import { IoCloudUpload } from "react-icons/io5";
import AxiosToastError from "../utils/Axiostoasterror";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import sweetalert from "../utils/Sweetalet.js";
import { IoMdCloseCircle } from "react-icons/io";

const ProductadminEdit = ({ data, close, fetchproduct }) => {
  const allcategory = useSelector((state) => state?.product.allCategory);
  const allsubcategory = useSelector((state) => state.product.allSubCategory);
  const [editdata, setEditData] = useState({
    _id: data._id,
    name: data.name,
    image: data.image,
    category: data.category,
    subCategory: data.subCategory,
    unit: data.unit,
    stock: data.stock,
    price: data.price,
    discount: data.discount,
    description: data.description,
    more_details: data.more_details || {},
  });

  const handlechange = (e) => {
    const { name, value } = e.target;
    setEditData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleremoveimage = (index) => {
    data.image.splice(index, 1);
    setEditData((preve) => {
      return {
        ...preve,
      };
    });
  };

  const handleaddcategory = (e) => {
    const value = e.target.value;
    const categorydata = allcategory.find((el) => el._id === value);
    setEditData((preve) => {
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
    setEditData((preve) => {
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

        setEditData((preve) => {
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
    data.category.filter(deletecategory, 1);
    setEditData((preve) => {
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
    data.subCategory.filter(deletecategory, 1);
    setEditData((preve) => {
      return {
        ...preve,
      };
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...summaryApi.editproductdetails,
        data: editdata,
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        sweetalert(response.data.message);
        fetchproduct();
        if (close) {
          close();
        }
        setEditData({
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
      }
      // console.log("product uploaded",response.data)
    } catch (error) {
      AxiosToastError(error);
    }

    // console.log("data is:",editdata);
  };

  return (
    <section className="p-8 py-14 bg-gray-100 min-h-screen fixed top-20 left-0 right-0 bottom-0 z-50 overflow-auto">
      <div className="flex items-center justify-between bg-white px-6 py-4 rounded-xl shadow-md mb-6">
        <h2 className="text-xl font-semibold text-gray-700">Update Product</h2>
        <button onClick={close}>
          <IoMdCloseCircle size={20} />
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 max-w-3xl mx-auto">
        <form onSubmit={handlesubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="font-medium text-gray-700">
              Product Name
            </label>

            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your product name"
              value={editdata.name}
              onChange={handlechange}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
              value={editdata.description}
              rows={3}
              required
              onChange={handlechange}
              className="border border-gray-300 rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-medium text-gray-700">Product Images</p>

            <label htmlFor="image">
              <div className="w-full h-28 border-2 border-dashed border-blue-400 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 transition">
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
              {editdata.image.map((img, index) => {
                return (
                  <div
                    key={index}
                    className="relative border rounded-lg overflow-hidden group"
                  >
                    <img
                      src={img}
                      alt={img}
                      className="h-24 w-full object-cover"
                    />

                    {/* Delete Button */}
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

            <div className="flex flex-wrap  items-center gap-2 border border-gray-300 rounded-lg p-3 bg-gray-50">
              {editdata.category.map((cata, index) => {
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

              <select
                onChange={handleaddcategory}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
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

          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-700">SubCategory:</label>

            <div className="flex flex-wrap items-center gap-2 border border-gray-300 rounded-lg p-3 bg-gray-50">
              {editdata.subCategory.map((cata, index) => {
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

              <select
                onChange={handleaddSubcategory}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value={""} disabled>
                  Select Sub Category
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
              value={editdata.unit}
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
              value={editdata.stock}
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
              value={editdata.price}
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
              value={editdata.discount}
              onChange={handlechange}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-yellow-400 text-black font-medium py-2 rounded-lg hover:bg-yellow-500"
          >
            Update Product
          </button>
        </form>
      </div>
    </section>
  );
};

export default ProductadminEdit;
