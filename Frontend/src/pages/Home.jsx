import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ECommerce from "../assets/E-Commerce.jpg";
import bannerMobile from "../assets/banner-mobile.jpg";
import { useSelector } from "react-redux";
import { Urlcreation } from "../utils/urlcreation";
import CategoryProductcard from "../components/CategoryProductcard";
import New from "../assets/New.jpg";
const Home = () => {
  const allcategory = useSelector((state) => state.product.allCategory);
  const allSubcategory = useSelector((state) => state.product.allSubCategory);
  const navigate = useNavigate();
  // console.log("all category from redux is:",allcategory);

  const handleredirectToSubcategory = (categoryId, categoryname) => {
    console.log("clicked category id is:", categoryId);
    const subcategory = allSubcategory.find((sub) => {
      const filtersubcategory = sub.category.some((cat) => {
        return cat._id === categoryId;
      });
      return filtersubcategory ? true : null;
    });
    const url = `/${Urlcreation(categoryname)}-${categoryId}/${Urlcreation(subcategory.name)}-${subcategory._id}`;
    navigate(url);
  };
  return (
    <section className="mt-4">
      <div className="h-[40vh] w-full overflow-hidden rounded-2xl container mx-auto">
        <div className="flex">
          <img
            src={ECommerce}
            alt="ECommerce"
            className="h-full w-full object-contain object-top hidden lg:block"
          />
          <img
            src={New}
            alt="New"
            className="h-full w-full object-contain object-top hidden lg:block"
          />
        </div>

        <img
          src={bannerMobile}
          alt="bannerMobile"
          className="h-full w-full object-cover object-top lg:hidden"
        />
      </div>

      <div className="mt-2">
        <div className="flex items-center justify-center mt-1">
          <h2 className="font-semibold text-xl">All Category</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-9 gap-4 mt-2 px-2">
          {allcategory.map((category, index) => {
            return (
              <div
                onClick={() =>
                  handleredirectToSubcategory(category._id, category.name)
                }
                key={index}
                className="rounded-sm shadow-sm hover:shadow-md transition bg-white flex flex-col items-center justify-center p-1"
              >
                <div className="h-24 w-24 overflow-hidden rounded-md flex items-center justify-center">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-contain"
                  />
                </div>

                <p className=" mt-2 text-center">
                  {category.name}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-center mt-2 font-semibold text-xl border-b-1 pb-3">
          <h2>Category product</h2>
        </div>
        <div className="px-4 md:px-6 lg:px-2">
          {allcategory.map((category) => {
            return (
              <div key={category._id + "displayproducts"} className="mb-1">
                <div className="flex items-center justify-between mb-0.5">
                  <p className="font-semibold text-lg">{category.name}</p>

                  <p className="text-sm text-blue-600 cursor-pointer">
                    See all
                  </p>
                </div>

                <div className="p-1  rounded-lg">
                  <CategoryProductcard id={category._id} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Home;
