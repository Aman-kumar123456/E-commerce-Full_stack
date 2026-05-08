import React, { useEffect, useState } from "react";
import ProductLoadingcard from "../components/ProductLoadingcard";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";
import toast from "react-hot-toast";
import CategortProCard from "../components/CategortProCard";
// import Productcard from "../components/Productcard";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from "react-router-dom";
import Nodata from '../assets/Nodata.png'

const Searchpage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalpageCount, setTotalPagecount] = useState();
  const params = useLocation();
  const searchtext = params?.search?.slice(3);
  // const queryParams = new URLSearchParams(params.search);
  // const searchtext = queryParams.get("q") || "";

  const fetchproduct = async () => {
    try {
      setLoading(true);
      const responseproduct = await Axios({
        ...summaryApi.getproductonsearch,
        data: {
          search: searchtext,
           page: page,
        },
      });

      if (responseproduct.data.error) {
        toast.error(responseproduct.data.message);
      }
      if (responseproduct.data.success) {
        if (responseproduct.data.page === 1) {
          setData(responseproduct.data.data);
        } else {
          setData((prev) => [...prev, ...responseproduct.data.data]);
        }
        setTotalPagecount(responseproduct.data.totalpageCount);
        // console.log("product on search page is:", responseproduct.data.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };




    useEffect(() => {
  setPage(1);
}, [searchtext]);


  useEffect(() => {
    fetchproduct();
  }, [page, searchtext]);

  const fetchmore = () => {
    if (totalpageCount > page) {
      setPage((preve) => preve + 1);
    }
  };
  const showLoading = new Array(14).fill(null);
  return (
    <section className="w-full">
      <div className="max-w-7xl container mx-auto px-4">
        {/* Header */}
        <div className="mt-2 w-full bg-white shadow-md rounded-sm h-15 flex items-center">
          <h2 className="ml-4">{`Product: ${data.length}`}</h2>
        </div>

        <InfiniteScroll
          dataLength={data.length}
          hasMore={true}
          next={fetchmore}
        >
          <div className="max-w-7xl mx-auto px-4 mt-4 mb-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {loading &&
              showLoading.map((_, index) => {
                return <ProductLoadingcard key={index} />;
              })}
            {data.map((product) => {
              return (
                <CategortProCard
                  key={product._id + "searchproduct"}
                  product={product}
                />
              );
            })}
    
          </div>
        </InfiniteScroll>
         {
              !data[0] && !loading &&(
                <div className="w-full flex items-center justify-center mt-20">
                <div className=" flex flex-col items-center gap-2">
                  <img src={Nodata}
                  className="h-40 w-40 "/>
                  <p>NO data Avilable</p>
                </div>
                </div>
               
              )
            }
      </div>
    </section>
  );
};

export default Searchpage;
