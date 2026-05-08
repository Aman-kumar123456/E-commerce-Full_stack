import React from "react";
import { Link, useLocation } from "react-router-dom";
import successimage from "../assets/success.png";
const SuccessOrder = () => {
  const location = useLocation();
  console.log("location is:", location?.state?.text);
  return (
    <section className="flex items-center justify-center">
      <div className="flex flex-col items-center justify-center mt-40 gap-2">
        <div>
          <img src={successimage} alt={successimage} className="h-20 w-20" />
        </div>
        <p className="font-semibold">
          {location?.state?.text ? location?.state?.text : "Payment"}{" "}
          Successfully
        </p>
        <Link to={"/"}>
          <button className="bg-green-300 min-w-[110px] max-w-[120px] rounded p-1 mt-20 border border-green-500">
            Back to Home
          </button>
        </Link>
        {/* SuccessOrder */}
      </div>
    </section>
  );
};

export default SuccessOrder;
