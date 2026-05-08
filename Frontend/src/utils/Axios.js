import axios from 'axios'
import  summaryApi, { baseURL } from '../common/summaryApi'

const Axios=axios.create({
baseURL:baseURL,
withCredentials:true
})

// send accesstoken in every request to server
Axios.interceptors.request.use(
    async(config)=>{
        const accesstoken=localStorage.getItem('accesstoken');

        if(accesstoken){
            config.headers.Authorization=`Bearer ${accesstoken}`
        }
        return config
    },
    (error)=>{
return Promise.reject(error);
    }
)

// for renew accesstoken if it is expired

Axios.interceptors.response.use(
    (response)=>{
    return response
    },
    async(error)=>{
 let originRequest = error.config 

        if(error.response.status === 401 && !originRequest.retry){
            originRequest.retry = true

            const refreshtoken = localStorage.getItem("refreshtoken")

            if(refreshtoken){
                const newAccessToken = await refreshAccessToken(refreshtoken)

                if(newAccessToken){
                    originRequest.headers.Authorization = `Bearer ${newAccessToken}`
                    return Axios(originRequest)
                }
            }
        }
        
        return Promise.reject(error)
    }
)

const refreshAccessToken = async(refreshToken)=>{
    try {
        const response = await Axios({
            ...summaryApi.refresh_token,
            headers : {
                Authorization : `Bearer ${refreshToken}`
            }
        })

        const accessToken = response.data.data.accessToken
        localStorage.setItem('accesstoken',accessToken)
        return accessToken
    } catch (error) {
        console.log(error)
    }
}
export default Axios;