import React from "react";
import { useState } from "react";
import AxiosToastError from "../utils/AxiosToastError.js";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";
import toast from "react-hot-toast";
import { useEffect } from "react";
import Loading from "../components/Loading";
import Productcard from "../components/Productcard";
import ProductadminEdit from "../components/ProductadminEdit";
import ProductLoadingcard from "../components/ProductLoadingcard";
import ProductAdminLoading from "../components/ProductAdminLoading";

const Productsadmin = () => {
  const [productdata, setProductdata] = useState([]);
  const [page, setPage] = useState(1);
  const [totalpageno, setTotalPageno] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setsearch] = useState("");

  const handleprevious = () => {
    if (page > 1) {
      setPage((preve) => preve - 1);
    }
  };
  const handlenext = () => {
    if (page < totalpageno) {
      setPage((preve) => preve + 1);
    }
  };

  const handlesearchonchange = (e) => {
    const { value } = e.target;
    setsearch(value);
    setPage(1);
  };
  // console.log("search is:",search);

  const fetchproduct = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...summaryApi.getproduct,
        data: {
          page: page,
          search: search,
          limit: 16,
        },
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        // toast.success(response.data.message);
        setProductdata(response.data.data);
        setTotalPageno(response.data.totalpageCount);
        // console.log("product data is:", response.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let flag = true;
    const interval = setTimeout(() => {
      if (flag) {
        fetchproduct();
        flag = false;
      }
    }, 500);

    return () => {
      clearTimeout(interval);
    };
  }, [page, search]);
  // console.log("product data coming from server is:", productdata);

  const Loadingcard = new Array(16).fill(null);
  return (
   <section className="w-full h-screen flex flex-col">
  
  <div className="flex items-center justify-between bg-white px-6 py-4 shadow-md sticky top-0 z-10">
    <h2 className="text-xl font-semibold text-gray-700">Products</h2>

    <input
      type="text"
      placeholder="Search product..."
      value={search}
      onChange={handlesearchonchange}
      className="border px-3 py-1 rounded-md outline-none"
    />
  </div>

  <div className="flex-1 overflow-y-auto p-2">

    {loading ? (
      <div className="flex items-center justify-center h-full">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {Loadingcard.map((_, index) => (
            <ProductAdminLoading key={index} />
          ))}
        </div>
      </div>
    ) : (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2">
        {productdata.map((product, index) => (
          <Productcard
            key={product._id || index}
            data={product}
            fetchproduct={fetchproduct}
          />
        ))}
      </div>
    )}

  </div>

  <div className="flex items-center justify-between px-6 py-3 bg-white border-t">
    <button
      onClick={handleprevious}
      disabled={page === 1}
      className="bg-yellow-400 hover:bg-yellow-500 px-4 py-1 rounded"
    >
      Previous
    </button>

    <p>{page} / {totalpageno}</p>

    <button
      onClick={handlenext}
      disabled={page === totalpageno}
      className="bg-yellow-400 hover:bg-yellow-500 px-4 py-1 rounded"
    >
      Next
    </button>
  </div>

</section>
  );
};

export default Productsadmin;
