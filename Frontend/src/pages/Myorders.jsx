import React from "react";
import { useSelector } from "react-redux";
import Nodata from "../components/Nodata";

const Myorders = () => {
  const allorders = useSelector((state) => state?.order?.Allorder);
  console.log("all orders:", allorders);
  return (
    <section>
      <div className="bg-white w-full h-10 shadow-sm flex items-center">
      <h2 className="ml-2" > My orders:</h2>
      </div>


      
        <div>
          {
            !allorders[0] && <Nodata/>
          }
          <div className="mt-4 flex flex-col gap-2">
{
            allorders.map((order,index)=>{
              return (
                <div key={order._id+index} className="grid grid-cols-3 items-center bg-white p-2 shadow ">
                  <img src={order.product_details.image[0]}
                  className="h-20 w-20 shadow"/>
                  <p className="font-semibold max-w-[250px] flex items-center">{order.product_details.name}</p>
                  <p>{order.orderId}</p>
                  </div>
              )
            })
          }
          </div>
          
        </div>
    
    </section>
  );
};

export default Myorders;
