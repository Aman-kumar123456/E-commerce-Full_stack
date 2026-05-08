import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SetAddress from "../components/SetAddress";
import AxiosToastError from "../utils/AxiosToastError.js";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";
import toast from "react-hot-toast";
import getAddress from "../utils/getAddress";
import { setAlladdress } from "../Store/addressSlice";
import Editaddress from "../components/Editaddress";
import Nodata from "../components/Nodata";

const Myaddresses = () => {
  const Alladdress = useSelector((state) => state?.address?.allAddress);
  const [OpenAddress, setOpenaddress] = useState(false);
  const dispatch = useDispatch();
  const [openEdit,setOpenEdit]=useState(false);
  const [previousAddress,setPreviousAddress]=useState({});
  console.log("previousAddressdata is:",previousAddress);

  console.log("address in my address page :", Alladdress);

  // delete address
  const handleDeleteAddress = async (addressId) => {
    console.log(addressId);
    try {
      const deleteresponse = await Axios({
        ...summaryApi.deleteaddress,
        data: {
          _id: addressId,
        },
      });
      if (deleteresponse.data.error) {
        toast.error(deleteresponse.data.message);
      }
      if (deleteresponse.data.success) {
        toast.success(deleteresponse.data.message);
        const getaddress = await getAddress();
        dispatch(setAlladdress(getaddress.data));
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <section className="flex flex-col gap-1">
      <div className="w-full h-10 bg-white shadow-sm mt-1 rounded flex items-center justify-between">
        <h2 className="ml-2 font-semibold">My All Saved Address:</h2>
        <div className="mt-100">
          {
            !Alladdress[0] && <Nodata/>
          }
        </div>
        <button
          onClick={() => setOpenaddress(true)}
          className="mr-2 flex items-center justify-center min-w-[110px] max-w-[120px] h-8 bg-yellow-300 hover:bg-yellow-500 rounded "
        >
          Add Address
        </button>
      </div>
      <div className="bg-blue-50 p-2 grid gap-4">
        {Alladdress?.map((address, index) => {
          return (
            <div
              className={`shadow-sm rounded p-3 flex gap-3 bg-white ${!address.status && "hidden"}`}
            >
              <div className="w-full flex justify-between">
                <div>
                  <p>{address.address_line}</p>
                  <p>{address.city}</p>
                  <p>{address.state}</p>
                  <p>
                    {address.country} - {address.pincode}
                  </p>
                  <p>{address.mobile}</p>
                </div>
                <div className="flex flex-col justify-center gap-4">
                  <button
                    onClick={() =>{
                      setOpenEdit(true)
                      setPreviousAddress(address)
                    }}
                    className="bg-green-200 hover:bg-green-300 p-1 rounded"
                  >
                    Edit Address
                  </button>
                  <button
                    onClick={() => handleDeleteAddress(address._id)}
                    className="bg-red-200 hover:bg-blue-300 p-1 rounded"
                  >
                    Delete Address
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {OpenAddress && <SetAddress close={() => setOpenaddress(false)} />}



        {
          openEdit &&
          <Editaddress close={()=>setOpenEdit(false)} data={previousAddress}/>
        }
    </section>
  );
};

export default Myaddresses;
