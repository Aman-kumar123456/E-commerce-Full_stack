import toast from "react-hot-toast"
import summaryApi from "../common/summaryApi"
import Axios from "./Axios.js"

const getAddress=async()=>{
    try {
        const addressresponse=await Axios({
            ...summaryApi.getaddress,
        })
        if(addressresponse.data.error){
            toast.error(addressresponse.data.message);
            // return addressresponse.data 
        }
        if(addressresponse.data.success){
            // toast.success(addressresponse.data.message);
            return addressresponse.data
        }
        // Fallback return if neither success nor error
    } catch (error) {
        console.log("Error fetching address:", error)
        // toast.error("Failed to fetch addresses")
        // return { success: false, error: true, message: error.message }
    }
}




export default getAddress;