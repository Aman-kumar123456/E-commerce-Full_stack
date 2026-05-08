import summaryApi from "../common/summaryApi"
import Axios from "./Axios"
import  toast, { Toaster } from 'react-hot-toast';
import AxiosToastError from "./AxiosToastError.js";

const getAllorders=async()=>{
try {
    const orderresponse=await Axios({
    ...summaryApi.getallorders,
})
if(orderresponse.data.error){
    toast.error(orderresponse.data.message)
}
if(orderresponse.data.success){
    // toast.success(orderresponse.data.message)
    return orderresponse.data
}
} catch (error) {
    AxiosToastError(error)
}
}

export default getAllorders;