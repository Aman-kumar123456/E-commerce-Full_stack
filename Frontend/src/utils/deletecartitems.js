import toast from "react-hot-toast"
import summaryApi from "../common/summaryApi"
import Axios from "./Axios"
import AxiosToastError from "./AxiosToastError"

const deletecartitems=async(cardId)=>{
    try {
        const deleteresponse= await Axios({
            ...summaryApi.deletecartitem,
            data:{
            _id:cardId
            }
        })
        if(deleteresponse.data.error){
            toast.error(deleteresponse.data.message)
        }
        if(deleteresponse.data.success){
            toast.success(deleteresponse.data.message);
            return deleteresponse.data
        }
    } catch (error) {
        AxiosToastError(error)
    }
}

export default deletecartitems;