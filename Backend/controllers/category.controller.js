import CategoryModel from "../models/category.model.js";
import ProductModel from "../models/product.model.js";
import SubCategoryModel from "../models/subcategory.model.js";


export async function Addcategorycontroller(request,response){
try {
    const {name,image}=request.body;

    if(!name ||!image){
        return response.status(400).json({
            message:"Provide Category Name and Image",
            error:true,
            success:false
        })
    }

    const newcategory=new CategoryModel({
        name,
        image
    })

    const savecategory=await newcategory.save();

    if(!savecategory){
        return response.status(404).json({
            message:"category Not Added",
            error:true,
            success:false
        })
    }

    return response.json({
        message:"category Added",
        error:false,
        success:true,
        data:savecategory
    })

} catch (error) {
    return response.status(500).json({
        message:error.message ||error,
        error:true,
        success:false
    })
}
}












// fetch all category




export async function getcategorycontroller(request,response){
try {
    const allcategory=await CategoryModel.find().sort({createdAt:-1});

    return response.json({
        // message:"category Added",
        error:false,
        success:true,
        data:allcategory
    })

} catch (error) {
    return response.status(500).json({
        message:error.message ||error,
        error:true,
        success:false
    })
}
}

//Edit category data


export async function Updatecategorycontroller(request,response){
try {

const {_id,name,image}=request.body

const updatedcategory=await CategoryModel.updateOne({_id:_id},{
    name,
    image
})
return response.json({
    message:"Category Updated",
    success:true,
    error:false,
    data:updatedcategory
})
} catch (error) {
    return response.status(500).json({
        message:error.message ||error,
        error:true,
        success:false
    })
}
}




// delete category




export async function Deletecategorycontroller(request,response){
try {
const {_id}=request.body;

//pahele ye category koi me use ho raha haiu ki nahi
 const checkSubCategory = await SubCategoryModel.find({
            category : {
                "$in" : [ _id ]
            }
        }).countDocuments()

        const checkProduct = await ProductModel.find({
            category : {
                "$in" : [ _id ]
            }
        }).countDocuments()


        if(checkSubCategory>0 && checkProduct> 0 ){
            return response.status(400).json({
                message:"Can't delete it is in use",
                success:false,
                error:true
            })
        }
const deletecategory=await CategoryModel.deleteOne({_id:_id});

return response.json({
    message:"category deleted",
    error:false,
    success:true,
    data:deletecategory
})

} catch (error) {
    return response.status(500).json({
        message:error.message ||error,
        error:true,
        success:false
    })
}
}