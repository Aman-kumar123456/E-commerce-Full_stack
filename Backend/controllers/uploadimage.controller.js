import uploadImageClodinary from "../utils/uploadimagecloudinary.js"

export async  function Uploadimagecontroller(request,response){
    try {
        const image=request.file;

const uploadedimage=await uploadImageClodinary(image)

        return response.json({
            message:"Category image Uploded",
            success:true,
            error:false,
            // url:uploadedimage.url,
            data:uploadedimage
        })
    } catch (error) {
        return response.status(500).json({
            message:error.message || error,
            success:false,
            error:true
        })
    }

}