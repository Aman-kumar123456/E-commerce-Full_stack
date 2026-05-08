import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError.js";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";
import toast from "react-hot-toast";
// import Productcard from "../components/Productcard";
import CategortProCard from "../components/CategortProCard";

const CateWiseSubcategory = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const params = useParams();
  // console.log("parama is:",params);





    const subCategory = params?.subcategory?.split("-")
  const subCategoryName = subCategory?.slice(0, subCategory?.length - 1)?.join(" ")


  const categoryId = params.category.split("-").slice(-1)[0];
  const subcategoryId = params.subcategory.split("-").slice(-1)[0];

  // console.log("categoryid and subcategoryid is:",categoryId,subcategoryId);

  const fetproductbycategoryandsubcategory = async () => {
    try {
      const responseproduct = await Axios({
        ...summaryApi.getproductBycategoryAndsubCategory,
        data: {
          categoryId: categoryId,
          subcategoryId: subcategoryId,
          page: page,
          limit: 10,
        },
      });
      if (responseproduct.data.error) {
        toast.error(responseproduct.data.message);
      }
      if (responseproduct.data.success) {
        // toast.success(responseproduct.data.message);
        setData(responseproduct.data.data);
        // console.log(
        //   "product coming from product by category and subcategory from controller is:"
        //     ,responseproduct.data.data
        // );
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    fetproductbycategoryandsubcategory();
  }, [params]);
  return (
  <section>
<div>
  <div>
    {/* //name */}
     <div className='bg-white shadow-md p-4 z-10 mt-2 rounded-xl shadow-ms'>
            <h3 className='font-semibold'>{subCategoryName}</h3>
      </div>
  </div>
  <div className="grid grid-cols-9 mt-1">
    {
      data.map((product,index)=>{
        return(
        //  <Productcard key={product._id+"displayproduct"} data={product}/>
        <CategortProCard key={product._id+"displayproduct"} product={product} />
        )
      })
    }
  </div>
  {/* CateWiseSubcategory */}
</div>


    </section>
    );
};

export default CateWiseSubcategory;
