import ProductModel from "../models/product.model.js";

export async function Addproductccontroller(request, response) {
  try {
    const {
      name,
      image,
      category,
      subCategory,
      unit,
      stock,
      price,
      discount,
      description,
      more_details,
    } = request.body;
    if (
      !name ||
      !image[0] ||
      !category[0] ||
      !subCategory[0] ||
      !unit ||
      !stock ||
      !price ||
      !discount ||
      !description
    ) {
      return response.status(400).json({
        message: "Provide all fields",
        error: true,
        success: false,
      });
    }

    const newproduct = new ProductModel({
      name,
      image,
      category,
      subCategory,
      unit,
      stock,
      price,
      discount,
      description,
      more_details,
    });

    const saveproduct = await newproduct.save();

    return response.json({
      message: "product created successfully",
      error: false,
      success: true,
      data: saveproduct,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}

// fetch product using pagination.....

export async function getproductcontroller(request, response) {
  try {
    let { page, limit, search } = request.body;

    if (!page) {
      page = 1;
    }

    if (!limit) {
      limit = 10;
    }
    const skip = (page - 1) * limit;

    const query = search
      ? {
          $text: {
            $search: search,
          },
        }
      : {};

    const [data, totalcount] = await Promise.all([
      ProductModel.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("category subCategory"),
      ProductModel.countDocuments(query),
    ]);

    return response.json({
      message: "Product data",
      success: true,
      error: false,
      totalcount: totalcount,
      totalpageCount: Math.ceil(totalcount / limit),
      data: data,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}

// fetch product by category id..........
// category wise product fetching there.

export async function FetchproductBycategorycontroller(request, response) {
  try {
    const { id } = request.body;

    if (!id) {
      return response.status(400).json({
        message: "Provide category id",
        success: false,
        error: true,
      });
    }

    const product = await ProductModel.find({
      category: { $in: id },
    });
// .limit(10)
    return response.json({
      message: "Product data",
      success: true,
      error: false,
      data: product,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}

// fetch product by categoryID and subcategoryID.....

// import mongoose from "mongoose";

export async function getproductbycategoryidAndsubCategoryidcontroller(
  request,
  response,
) {
  try {
    let { categoryId, subcategoryId, page, limit } = request.body;

    if (!categoryId || !subcategoryId) {
      return response.status(400).json({
        message: "Provide category id and subcategory id",
        error: true,
        success: false,
      });
    }

    if (!page) page = 1;
    if (!limit) limit = 10;

    const query = {
      category: { $in: categoryId },
      subCategory: { $in: subcategoryId },
    };

    const skip = (page - 1) * limit;

    const [data, totalcount] = await Promise.all([
      ProductModel.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("category subCategory"),

      ProductModel.countDocuments(query),
    ]);

    console.log("Query:", query);
    console.log("Products Found:", data.length);

    return response.json({
      message: "Product fetch successfully",
      success: true,
      error: false,
      data: data,
      totalcount: totalcount,
      totalpagecount: Math.ceil(totalcount / limit),
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}

// getproductdetails by product id.........

export async function getproductDetailscontroller(request, response) {
  try {
    const { id } = request.body;

    if (!id) {
      return response.status(500).json({
        message: "Provide product id",
        success: false,
        error: true,
      });
    }

    const productsdetails = await ProductModel.findOne({ _id: id });

    return response.json({
      message: "Product details ",
      success: true,
      error: false,
      data: productsdetails,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}

// edit product details here.....
export async function editproductcontroller(request, response) {
  try {
    const {
      _id,
      name,
      image,
      category,
      subCategory,
      unit,
      stock,
      price,
      discount,
      description,
      more_details,
    } = request.body;

    if (!_id) {
      return response.status(400).json({
        message: "Provide product id",
        success: false,
        error: true,
      });
    }

    const productsdetails = await ProductModel.findOneAndUpdate(
      { _id: _id },
      {
        name,
        image,
        category,
        subCategory,
        unit,
        stock,
        price,
        discount,
        description,
        more_details,
      },
    );

    return response.json({
      message: "Product details ",
      success: true,
      error: false,
      data: productsdetails,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}

//delete product controller here.......

export async function deleteproductcontroller(request, response) {
  try {
    const { _id } = request.body;

    if (!_id) {
      return response.status(404)({
        message: "Provide id",
        error: true,
        success: false,
      });
    }

    const deletedproduct = await ProductModel.findByIdAndDelete({ _id: _id });

    return response.json({
      message: "Product deleted",
      success: true,
      error: false,
      data: deletedproduct,
    });
    return response;
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}


///// get product  on searchpage.....

export async function getproductonsearchcontroller(request, response) {
  try {
    let { page, limit, search } = request.body;

    if (!page) {
      page = 1;
    }

    if (!limit) {
      limit = 50;
    }
    const skip = (page - 1) * limit;

    const query = search
      ? {
          $text: {
            $search: search,
          },
        }
      : {};

    const [data, totalcount] = await Promise.all([
      ProductModel.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("category subCategory"),
      ProductModel.countDocuments(query),
    ]);
  
    return response.json({
      message: "Product data",
      success: true,
      error: false,
      totalcount: totalcount,
      totalpageCount: Math.ceil(totalcount / limit),
      data: data,
      page:page
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}