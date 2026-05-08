import summaryApi from "../common/summaryApi";
import Axios from "./Axios";

const fetchcategoryDetails=async()=>{
    try {
        const category=await Axios({
            ...summaryApi.getcategory
        })
        return category;
    } catch (error) {
        console.log(error);
    }
}

export default fetchcategoryDetails;