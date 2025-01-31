const express = require("express");
const {
  createUser,
  loginUserCtrl,
  getallUser,
  getaUser,
  deleteaUser,
  updatedUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getWishlist,
  saveAddress,
  userCart,
  getUserCart,
  createOrder,
  removeProductFromCart,
  updateProductQuantityFromCart,
  getMyOrders,
  emptyCart,
  getMonthWiseOrderIncome,
  getMonthWiseOrderCount,
  getYearlyTotalOrder,
  getAllOrders,
  getsingleOrder,
  updateOrder,
} = require("../controller/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { checkout, paymentVerification } = require("../controller/paymentCtrl");

const router = express.Router();

// User Registration API
router.post("/register", createUser);

// Forgot Password Token API
router.post("/forgot-password-token", forgotPasswordToken);

// Reset Password API
router.put("/reset-password/:token", resetPassword);

// Update Password API (requires authentication)
router.put("/password", authMiddleware, updatePassword);

// User Login API
router.post("/login", loginUserCtrl);

// Admin Login API
router.post("/admin-login", loginAdmin);

// Add product to cart API (requires authentication)
router.post("/cart", authMiddleware, userCart);

// Checkout API (requires authentication)
router.post("/order/checkout", authMiddleware, checkout);

// Payment Verification API (requires authentication)
router.post("/order/paymentVerification", authMiddleware, paymentVerification);

// Create Order API (requires authentication)
router.post("/cart/create-order", authMiddleware, createOrder);

// Get All Users (requires admin authentication)
router.get("/all-users", authMiddleware, isAdmin, getallUser);

// Get My Orders (requires authentication)
router.get("/getmyorders", authMiddleware, getMyOrders);

// Get All Orders (requires admin authentication)
router.get("/getallorders", authMiddleware, isAdmin, getAllOrders);

// Get Single Order Details (requires admin authentication)
router.get("/getaOrder/:id", authMiddleware, isAdmin, getsingleOrder);

// Update Order Details (requires admin authentication)
router.put("/updateOrder/:id", authMiddleware, isAdmin, updateOrder);

// Get Month-wise Order Income (requires authentication)
router.get("/getMonthWiseOrderIncome", authMiddleware, getMonthWiseOrderIncome);

// Get Yearly Total Order Income (requires authentication)
router.get("/getyearlyorders", authMiddleware, getYearlyTotalOrder);

// Refresh access token API
router.get("/refresh", handleRefreshToken);

// Logout API
router.get("/logout", logout);

// Get User Wishlist (requires authentication)
router.get("/wishlist", authMiddleware, getWishlist);

// Get User Cart (requires authentication)
router.get("/cart", authMiddleware, getUserCart);

// Get Single User Details (requires admin authentication)
router.get("/:id", authMiddleware, isAdmin, getaUser);

// Remove Product from Cart API (requires authentication)
router.delete(
  "/delete-product-cart/:cartItemId",
  authMiddleware,
  removeProductFromCart
);

// Update Product Quantity in Cart API (requires authentication)
router.delete(
  "/update-product-cart/:cartItemId/:newQuantity",
  authMiddleware,
  updateProductQuantityFromCart
);

// Empty Cart API (requires authentication)
router.delete("/empty-cart", authMiddleware, emptyCart);

// Delete User API (requires admin authentication)
router.delete("/:id", deleteaUser);

// Update User Details API (requires authentication)
router.put("/edit-user", authMiddleware, updatedUser);

// Save User Address API (requires authentication)
router.put("/save-address", authMiddleware, saveAddress);

// Block User API (requires admin authentication)
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);

// Unblock User API (requires admin authentication)
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

module.exports = router;