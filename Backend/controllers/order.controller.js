import mongoose from "mongoose";
import OrderModel from "../models/order.model.js";
import CartProductModel from "../models/cartproduct.model.js";
import UserModel from "../models/user.model.js";
import stripe from "../config/Stripe.js";
import Stripe from "../config/Stripe.js";
// import stripe from "../config/Stripe.js";
export async function AddorderController(request, response) {
  try {
    const userId = request.userId;

    const { allItems, delivery_addressId, subTotalAmt, totalAmt } =
      request.body;

    if (!delivery_addressId) {
      return response.status(404).json({
        message: "Provide Address",
        error: false,
        error: true,
      });
    }
    console.log("allitems", allItems);

    const payload = allItems.map((el) => {
      return {
        userId: userId,
        orderId: `ORDER_${new mongoose.Types.ObjectId()}`,
        productId: el.productId._id,
        product_details: {
          name: el.productId.name,
          image: el.productId.image,
        },
        paymentId: "",
        payment_status: "Cash on delivery",
        delivery_address: delivery_addressId,
        subTotalAmt: subTotalAmt,
        totalAmt: totalAmt,
        // invoice_receipt: "",
      };
    });

    const Neworder = await OrderModel.insertMany(payload);

    const removefromcart = await CartProductModel.deleteMany({
      userId: userId,
    });

    const updateuserCart = await UserModel.updateOne(
      { _id: userId },
      {
        shopping_cart: [],
      },
    );
    return response.json({
      message: "Order successfully",
      error: false,
      success: true,
      data: Neworder,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}

export const Pricediscount = (price, discount) => {
  const totaldiscountAmount = (Number(price) * Number(discount)) / 100;
  const actualamountprice = Number(price) - Number(totaldiscountAmount);
  return actualamountprice;
};
// Onlin payment controller for create checkout session to stripe here.....

export async function Stripepaymentcontroller(request, response) {
  try {
    const userId = request.userId;

    const { allItems, delivery_addressId, subTotalAmt, totalAmt } =
      request.body;

    const user = await UserModel.findById(userId);
    const line_items = allItems.map((item) => {
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.productId.name,
            images: item.productId.image,
            metadata: {
              productId: item.productId._id,
            },
          },
          unit_amount:
            Pricediscount(item.productId.price, item.productId.discount) * 100,
        },
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
        },
        quantity: item.quantity,
      };
    });

    const dataparams = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: user.email,
      metadata: {
        userId: userId,
        addressId: delivery_addressId,
      },
      line_items: line_items,
      success_url: `${process.env.FRONT_END}/success`,
      cancel_url: `${process.env.FRONT_END}/cancel`,
    };

    const createsession = await Stripe.checkout.sessions.create(dataparams);

    return response.status(200).json({
      success: true,
      error: false,
      id: createsession.id,
      session: createsession,
      message: "Stripe checkout session created",
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}

//webhook

const getOrderProductItems = async ({       
        lineItems,
        userId,
        addressId,
        paymentId,
        payment_status,}) => {
  const productList = [];

  if (lineItems?.data?.length) {
    for (const item of lineItems.data) {
      const product = await stripe.products.retrieve(item.price.product);

      console.log("product",product);
      const paylod = {
        userId: userId,
        orderId: `ORDER_${new mongoose.Types.ObjectId()}`,
        productId: product.metadata.productId,
        product_details: {
          name: product.name,
          image: product.images,
        },
        paymentId:   paymentId,
        payment_status:payment_status,
        delivery_address: addressId,
        subTotalAmt: Number(item.amount_total / 100),
        totalAmt: Number(item.amount_total / 100),
        // invoice_receipt: "",
      };
      productList.push(paylod);
    }
  }
  return productList;
};

//http://localhost5000/api/order/webhook
export async function webhookStripe(request, response) {
  console.log(" Webhook hit");

  const event = request.body;

  console.log("EVENT TYPE:", event.type);

  if (event.type === "checkout.session.completed") {
    console.log("PAYMENT SUCCESS");

    const session = event.data.object;

    try {
      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id
      );

      const orderProduct = await getOrderProductItems({
        lineItems,
        userId: session.metadata?.userId,
        addressId: session.metadata?.addressId,
        paymentId: session.payment_intent,
        payment_status: session.payment_status,
      });

      console.log("ORDER DATA:", orderProduct);

      await OrderModel.insertMany(orderProduct);

      await UserModel.findByIdAndUpdate(session.metadata.userId, {
        shopping_cart: [],
      });

      await CartProductModel.deleteMany({
        userId: session.metadata.userId,
      });

      console.log("ORDER SAVED IN DB");
    } catch (err) {
      console.log(" ERROR:", err);
    }
  }

  response.json({ received: true });
}





// get all orders controller here.....
export async function getAllorderscontroller(request, response) {
  try {
   const userId=request.userId;

const orders=await OrderModel.find({userId:userId}).sort({createdAt:-1}).populate('delivery_address')


return response.json({
  message:"get all orders",
  success:true,
  error:false,
  data:orders
})

  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}