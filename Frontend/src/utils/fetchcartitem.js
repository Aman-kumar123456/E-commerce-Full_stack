import toast from "react-hot-toast"
import summaryApi from "../common/summaryApi.js"
import Axios from "./Axios.js"

const getcartitems=async()=>{
try {
  const cartresponse=await Axios({
    ...summaryApi.getcartitems
  })
  if(cartresponse.data.error){
    toast.error(cartresponse.data.message)
  }
  if(cartresponse.data.success){
return cartresponse.data
  }
} catch (error) {
  console.log(error)
}
}
export default getcartitems;