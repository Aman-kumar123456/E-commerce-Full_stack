import summaryApi from "../common/summaryApi";
import Axios from "./Axios";

const fetchUserdetails = async () => {
  try {
    const response = await Axios({
      ...summaryApi.user_details,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default fetchUserdetails;
