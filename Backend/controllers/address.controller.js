import AddressModel from "../models/address.model.js";
import UserModel from "../models/user.model.js";

// Add address controller here...........
export async function AddaddressController(request, response) {
  try {
    const userId = request.userId;
    const { address_line, city, state, pincode, country, mobile } =
      request.body;

    if (!address_line || !city || !state || !pincode || !pincode || !mobile) {
      return response.status(400).json({
        message: "Ptrovide all required fields",
        success: false,
        error: true,
      });
    }

    const Newaddress = new AddressModel({
      address_line,
      city,
      state,
      pincode,
      country,
      mobile,
      userId: userId,
    });

    const saveAddress = await Newaddress.save();

    const SaveInuser = await UserModel.findByIdAndUpdate(userId, {
      $push: {
        address_details: saveAddress._id,
      },
    });

    return response.json({
      message: "Address Added",
      success: true,
      error: false,
      data: saveAddress,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}

// get address controller here........

export async function getAddresscontroller(request, response) {
  try {
    const userId = request.userId;

    const alladdress = await AddressModel.find({ userId: userId }).sort({
      createdAt: -1,
    });

    return response.json({
      message: "Address got",
      success: true,
      error: false,
      data: alladdress,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}

// Delete Address controller here.....

export async function deleteAddresscontroller(request, response) {
  try {
    const userId = request.userId;
    const { _id } = request.body;

    if (!_id) {
      return response.status(404).json({
        message: "provide Address _id",
        error: true,
        success: false,
      });
    }

    const deletedAddress = await AddressModel.deleteOne({
      userId: userId,
      _id: _id,
    });

    return response.json({
      message: "Address Deleted",
      success: true,
      error: false,
      data: deletedAddress,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}

// Edit address controller here.....
export async function editAddressController(request, response) {
  try {
    const userId = request.userId;
    const { _id, address_line, city, state, pincode, country, mobile } =
      request.body;
    if (!_id) {
      return response.status(404).json({
        message: "Provide Address _id",
        error: true,
        success: false,
      });
    }

    const updatedAddress = await AddressModel.updateOne(
      { _id: _id, userId: userId },
      {
        address_line,
        city,
        state,
        pincode,
        country,
        mobile,
      },
    );
    return response.json({
      message: "Address Updated Successfully",
      error: false,
      success: true,
      data: updatedAddress,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}
