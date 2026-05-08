import CartProductModel from "../models/cartproduct.model.js";
import UserModel from "../models/user.model.js";

// add to cart controller......
export async function addtocartcontroller(request, response) {
  try {
    const userId = request.userId;
    const { productId } = request.body;

    if (!productId) {
      return response.status(400).json({
        message: "Provide product id",
        error: true,
        success: false,
      });
    }

    const check = await CartProductModel.findOne({ userId, productId });

    if (check) {
      return response.status(400).json({
        message: "product already in cart",
        success: false,
        error: true,
      });
    }

    const cartitem = new CartProductModel({
      productId: productId,
      quantity: 1,
      userId: userId,
    });

    const savecartitem = await cartitem.save();

    const cartproductsaveuser = await UserModel.findOneAndUpdate(
      { _id: userId },
      {
        $push: {
          shopping_cart: productId,
        },
      },
    );
    return response.json({
      message: "Item added to cart",
      success: true,
      error: false,
      data: savecartitem,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}

//get cart items controller here.....

export async function getcartitemcontroller(request, response) {
  try {
    const userId = request.userId;

    const cartitem = await CartProductModel.find({
      userId: userId,
    }).populate("productId");

    return response.json({
      message: "got cart items.",
      error: false,
      success: true,
      data: cartitem,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}

//in this cart items  quantity update  controller......

export async function updatequantityofcartitemcontroller(request, response) {
  try {
    const userId = request.userId;

    const { _id, Quant } = request.body;

    if (!_id || !Quant) {
      return response.status(400).json({
        message: "provide _id, qty",
        success: false,
        error: true,
      });
    }

    const checkcartItems = await CartProductModel.updateOne(
      { _id: _id, userId: userId },
      {
        quantity: Quant,
      },
    );
    return response.json({
      message: "item quantity updated",
      success: true,
      error: false,
      data: checkcartItems,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}

// delete items form  cart controller here......
export async function deleteitemfromcartcontroller(request, response) {
  try {
    const userId = request.userId;

    const { _id } = request.body;

    if (!_id) {
      return response.status(400).json({
        message: "provide _id, qty",
        success: false,
        error: true,
      });
    }

    const deletecartitems = await CartProductModel.deleteOne(
      { _id: _id, userId: userId },
    );
    return response.json({
      message: "item deleted from cart",
      success: true,
      error: false,
      data: deletecartitems,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}
