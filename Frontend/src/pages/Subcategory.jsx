import React, { useEffect, useState } from "react";
import Uploadsubcategory from "../components/Uploadsubcategory";
// import displayTable from '../components/displayTable'
import DisplayTable from "../components/DisplayTable";
import fetchsubcategoryDetails from "../utils/fetchsubcategoryDetails";
import { createColumnHelper } from "@tanstack/react-table";
import ShowSubcategoryimage from "../components/ShowSubcategoryimage";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import SubcategoryEdit from "../components/SubcategoryEdit";
import Conform from "../components/Conform";
const Subcategory = () => {
  const [openuploadSubcategory, setOpenuploadSubcategory] = useState(false);
  const [data, setData] = useState([]);
  const columnHelper = createColumnHelper();
  const [openshowsubcategory, setOpenShowsubCategory] = useState(false);
  const [imagedata, setImagedata] = useState();
  const [opensubcategoryEditBox,setOpensubcategoryEditBox]=useState(false)
  const [subCategoryAutofill,setSubcategoryAutofill]=useState();
  const [OpendeleteSubcategory,setOpendeleteSubcategory]=useState(false);
  const [deletesubcategorydata,setdeleteSubcategorydata]=useState();

  const fetchsubcategory = async () => {
    const fetchSubcategory = await fetchsubcategoryDetails();
    // console.log("data in subcategorypage", fetchSubcategory.data);
    setData(fetchSubcategory.data);
  };
  useEffect(() => {
    fetchsubcategory();
  }, []);

  const column = [
    columnHelper.accessor("name", {
      header: "Name",
    }),
    columnHelper.accessor("image", {
      header: "Image",
      cell: ({ row }) => {
        // console.log("row", row.original.image);
        return (
          <img
            src={row.original.image}
            alt={row.original.name}
            className="w-15 h-15"
            onClick={() => {
              setOpenShowsubCategory(true);
              setImagedata(row.original.image);
            }}
          />
        );
      },
    }),
    columnHelper.accessor("category", {
      header: "Category",
      cell: ({ row }) => {
        return (
          <>
            {row.original.category.map((cat, index) => {
              return <p key={cat?._id || index}>{cat.name}</p>;
            })}
          </>
        );
      },
    }),
    columnHelper.accessor("_id", {
      header: "Action Edit/ Delete ",
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center gap-4 ">
            <button className="text-green-500 hover:text-green-600" onClick={()=>{setOpensubcategoryEditBox(true)
              setSubcategoryAutofill(row.original)
            }}>
              <FaEdit size={20}  />
            </button>
            <button className="text-red-500 hover:text-red-600" onClick={()=>{setOpendeleteSubcategory(true)
              setdeleteSubcategorydata(row.original)
            }} >
              <AiFillDelete size={20} />
            </button>
          </div>
        );
      },
    }),
  ];
  return (
    <section className="w-full">
      <div className=" w-full flex items-center justify-between bg-white px-6 py-4 rounded-xl shadow-md">
        {/* Left Side Title */}
        <h2 className="text-xl font-semibold text-gray-700 sticky top-0 z-10">
          SubCategory Product
        </h2>

        {/* Right Side Button */}
        <button
          onClick={() => setOpenuploadSubcategory(true)}
          className="bg-yellow-400 hover:bg-yellow-500 text-white px-5 py-2 rounded-sm font-medium"
        >
          Upload Sub Category
        </button>
      </div>
      <div>
        <DisplayTable data={data} column={column} />
      </div>
      {
        opensubcategoryEditBox && <SubcategoryEdit close={()=>setOpensubcategoryEditBox(false)} subCategoryAutofill={subCategoryAutofill} fetchsubcategory={fetchsubcategory}/>
      }
      {
        OpendeleteSubcategory && <Conform close={()=>setOpendeleteSubcategory(false)} deletesubcategorydata={deletesubcategorydata} fetchsubcategory={fetchsubcategory}  />
      }
      <div>
        {openuploadSubcategory && (
          <Uploadsubcategory close={() => setOpenuploadSubcategory(false)} fetchsubcategory={fetchsubcategory}  />
        )}
      </div>
      {openshowsubcategory && (
        <ShowSubcategoryimage
          close={() => setOpenShowsubCategory(false)}
          Image={imagedata}
        />
      )}
    </section>
  );
};

export default Subcategory;
