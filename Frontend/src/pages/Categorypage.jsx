import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet, useParams } from "react-router-dom";
import { Urlcreation } from "../utils/urlcreation";
import { FaChevronCircleLeft } from "react-icons/fa";
import { FaChevronCircleRight } from "react-icons/fa";

// import { ChevronLeft, ChevronRight } from "lucide-react";

const Categorypage = () => {
  const allsubcategory = useSelector((state) => state.product.allSubCategory);

  const [data, setData] = useState([]);
  const scrollRef = useRef(null);

  const params = useParams();
  const categoryId = params.category.split("-").slice(-1)[0];

  // Filter Subcategory
  useEffect(() => {
    const subcategoryfiltered = allsubcategory.filter((sub) => {
      const filtersubcategory = sub.category.some((cate) => {
        return cate._id === categoryId;
      });
      return filtersubcategory ? true : null;
    });

    setData(subcategoryfiltered);
  }, [params, allsubcategory]);

  // Scroll Functions
  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -200,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 200,
      behavior: "smooth",
    });
  };

  return (
    <section className="grid grid-rows-[80px_1fr] min-h-screen w-full">
      <div
        className="
      sticky 
      top-[116px] 
      lg:top-[80px]
      relative
      h-[80px]
      flex items-center
      bg-gray-50 
      border-b 
      overflow-hidden
      z-40
    "
      >
        <button
          onClick={scrollLeft}
          className="
          absolute left-0 top-0
          h-full w-[50px]
          z-20
          flex items-center justify-center
          bg-gradient-to-r 
          from-white via-white/90 to-transparent
        "
        >
          <FaChevronCircleLeft className="text-2xl text-gray-600 hover:text-red-500 transition" />
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className="
          flex items-center gap-4
          overflow-x-auto
          scrollbar-hide
          h-full w-full
          px-[60px]
        "
        >
          {data.map((subcategory) => {
            const url = `/${Urlcreation(
              subcategory?.category[0]?.name,
            )}-${subcategory?.category[0]?._id}/${Urlcreation(
              subcategory.name,
            )}-${subcategory._id}`;

            return (
              <Link key={subcategory._id + "subcategory"} to={url}>
                <div
                  className="
                  flex items-center gap-3 
                  px-4 py-2
                  bg-white 
                  border border-gray-200
                  rounded-full
                  shadow-sm
                  hover:shadow-md
                  hover:border-red-400
                  hover:bg-red-50
                  transition-all duration-200
                  cursor-pointer
                  whitespace-nowrap
                  min-w-max
                "
                >
                  <img
                    src={subcategory.image}
                    alt={subcategory.name}
                    className="
                    h-10 w-10 
                    object-contain
                    rounded-full
                    bg-gray-100
                    p-1
                  "
                  />

                  <p className="text-sm font-medium text-gray-700">
                    {subcategory.name}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Right Button */}
        <button
          onClick={scrollRight}
          className="
          absolute right-0 top-0
          h-full w-[50px]
          z-20
          flex items-center justify-center
          bg-gradient-to-l 
          from-white via-white/90 to-transparent
        "
        >
          <FaChevronCircleRight className="text-2xl text-gray-600 hover:text-red-500 transition" />
        </button>
      </div>

      {/* Products */}
      <div className="overflow-y-auto">
        <Outlet />
      </div>
    </section>
  );
};

export default Categorypage;
