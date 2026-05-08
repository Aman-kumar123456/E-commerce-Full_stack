import SubCategoryModel from "../models/subcategory.model.js";
// add subcategory controller......
export async function AddSubcategory(request, response) {
  try {
    const { name, image, category } = request.body;

    if (!name || !image || !category[0]) {
      return response.status(400).json({
        message: "Provide all fields",
        error: true,
        success: false,
      });
    }
    const payload = {
      name,
      image,
      category,
    };
    const sucategory = new SubCategoryModel(payload);

    const saveSubcategory = await sucategory.save();

    return response.json({
      message: "Subcategory Added",
      success: true,
      error: false,
      data: saveSubcategory,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}


// fetch subcategory controller




export async function getSubcategory(request, response) {
  try {
   const subcategory=await SubCategoryModel.find().populate('category');

   return response.json({
    success:true,
    error:false,
    data:subcategory
   })
   return 
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}




// edit subcategory controller.....

export async function EditSubcategorycontroller(request, response) {
  try {
const {_id,name,image,category}=request.body

if(!_id || !name || !image || !category[0]){
  return response.status(500).json({
    message:"Provide all required fields",
    error:true,
    success:false
  })
}
const findsubcategory=await SubCategoryModel.findById(_id);

const updatedsubcategory=await SubCategoryModel.findByIdAndUpdate(_id,{
  name,
  image,
  category
})

   return response.json({
    message:"subcategory Edited",
    error:false,
    success:true,
    data:updatedsubcategory
   })
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}



//delete subcategory controller.....
export async function DeleteSubcategorycontroller(request, response) {
  try {
    const {_id}=request.body;
console.log("_id",_id);
    const deletesubcategory=await SubCategoryModel.deleteOne({_id:_id});

    return response.json({
      message:"Subcategory deleted",
      error:false,
      success:true,
      data:deletesubcategory
    })
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}