export const baseURL = import.meta.env.VITE_BACKEND_URL;

const summaryApi = {
  register: {
    url: "/api/user/register",
    method: "post",
  },

  login: {
    url: "/api/user/login",
    method: "post",
  },
  forgot_password: {
    url: "/api/user/forget-password",
    method: "put",
  },

  verify_otp: {
    url: "/api/user/verify-otp",
    method: "put",
  },

  reset_password: {
    url: "/api/user/reset-newpassword",
    method: "put",
  },
  refresh_token: {
    url: "/api/user/refresh-token",
    method: "post",
  },
  user_details: {
    url: "/api/user/user-details",
    method: "get",
  },
  logout: {
    url: "/api/user/logout",
    method: "get",
  },
  upload_avatar: {
    url: "/api/user/update-avatar",
    method: "put",
  },
  update_userdetails: {
    url: "/api/user/update-userdetails",
    method: "put",
  },
  uploadImage: {
    url: "/api/upload/uploadcategoryimage",
    method: "put",
  },
  addcategory: {
    url: "/api/category/add-category",
    method: "post",
  },
  getcategory: {
    url: "/api/category/get-category",
    method: "get",
  },
  updatecategory: {
    url: "/api/category/update-category",
    method: "put",
  },
  deletecategory: {
    url: "/api/category/delete-category",
    method: "delete",
  },
  addsubcategory: {
    url: "/api/subcategory/add-subcategory",
    method: "post",
  },
  getsubcategory: {
    url: "/api/subcategory/get-subcategory",
    method: "get",
  },
  editsubcategory: {
    url: "/api/subcategory/edit-subcategory",
    method: "put",
  },
  deletesubcategory: {
    url: "/api/subcategory/delete-subcategory",
    method: "delete",
  },
  addproduct: {
    url: "/api/product/add-product",
    method: "post",
  },
  getproduct: {
    url: "/api/product/get-product",
    method: "post",
  },
  fetchproductbycategory: {
    url: "/api/product/fetch-productby-category",
    method: "post",
  },
  getproductBycategoryAndsubCategory: {
    url: "/api/product/get-productby-categoryId-subcategoryId",
    method: "post",
  },
  getproductdetails: {
    url: "/api/product/get-productdetails",
    method: "post",
  },
  editproductdetails: {
    url: "/api/product/update-product-details",
    method: "put",
  },
  deleteproducts:{
    url:'/api/product/delete-product',
    method:'delete'
  },
  getproductonsearch:{
    url:'/api/product/get-product-search',
    method:'post'
  },
  addtocart:{
    url:'/api/cart/addtocart',
    method:'post'
  },
  getcartitems:{
    url:'/api/cart/get-cartitem',
    method:'get'
  },
  updatecartitemquantity:{
    url:'/api/cart/update-itemquantity',
    method:'put'
  },
  deletecartitem:{
    url:'/api/cart/delete-cartitem',
    method:'delete'
  },
  addAddress:{
    url:'/api/address/add-address',
    method:'post'
  },
  getaddress:{
    url:'/api/address/get-address',
    method:'get'
  },
  deleteaddress:{
    url:'/api/address/delete-address',
    method:'delete'
  },
  editaddress:{
    url:'/api/address/update-address',
    method:'put'
  },
  addorder:{
    url:'/api/order/add-order',
    method:'post'
  },
  paymentsession_url:{
    url:'/api/order/stripe-payment-session',
    method:'post'
  },
  getallorders:{
    url:'/api/order/get-orders',
    method:'get'
  }
};
export default summaryApi;
