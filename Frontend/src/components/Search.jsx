import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useLocation, useNavigate,} from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location);
  const params=useLocation();

  const search=params?.search?.slice(3);

  const [issearchpage, setIssearchpage] = useState(false);

  useEffect(() => {
    const searchpage = location.pathname === "/search";
    setIssearchpage(searchpage);
  }, [location]);

  const handleredirectsearchpage = () => {
    navigate("/search");
  };
  // console.log(issearchpage);




  const HandleSearch=(e)=>{
const value=e.target.value
console.log("search Value is:",value);
const searchUrl=`/search?q=${value}`
navigate(searchUrl);
  }

  return (
    <div className="w-full border min-w-[280px] lg:min-w-[320px] h-8 lg:h-10 rounded-lg flex items-center bg-gray-100 group focus-within:border-yellow-600 ">
      <button className=" flex items-center justify-center p-3 text-gray-500 group-focus-within:text-yellow-600 ">
        <FaSearch />
      </button>

      <div  onClick={handleredirectsearchpage} className="w-full h-full">
        {!issearchpage ? (
          <div className="w-full h-full flex items-center">
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                "Search Rice",
                1000, // wait 1s before replacing "Mice" with "Hamsters"
                "Search Milk",
                1000,
                "Search Style",
                1000,
                "Search Baby Care",
                1000,
              ]}
              wrapper="span"
              speed={50}
              style={{ fontSize: "1em", display: "inline-block" }}
              repeat={Infinity}
            />
          </div>
        ) : (
          <div className="w-full h-full" >
            <input type='text' 
            defaultValue={search}
            placeholder="Search for rice daal roti Milk"  
            className="w-full h-full bg-transparent  outline-none "
           onChange={HandleSearch}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
