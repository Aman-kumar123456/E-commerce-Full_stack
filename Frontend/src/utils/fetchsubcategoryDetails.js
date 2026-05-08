import summaryApi from "../common/summaryApi";
import Axios from "./Axios";

const fetchsubcategoryDetails=async()=>{
    try {
        const subcategoryresponse=await Axios({
            ...summaryApi.getsubcategory
        })
        // console.log("all uploaded subcategory is:",subcategoryresponse.data)
        return subcategoryresponse.data
    } catch (error) {
        console.log(error);
    }
}
export default fetchsubcategoryDetails;