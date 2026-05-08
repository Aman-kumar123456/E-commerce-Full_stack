import summaryApi from "../common/summaryApi.js"
import Axios from "./Axios"
import toast from "react-hot-toast"
const updatecartitemsquantity=async(_id,Quant)=>{
    const updateresponse=await Axios({
        ...summaryApi.updatecartitemquantity,
        data:{
            _id:_id,
            Quant:Quant
        }
        
    })
    if(updateresponse.data.error){
        toast.error(updateresponse.data.message)
    }
    if(updateresponse.data.success){
        toast.success(updateresponse.data.message)
        return updateresponse.data
    }
}
export default updatecartitemsquantity;