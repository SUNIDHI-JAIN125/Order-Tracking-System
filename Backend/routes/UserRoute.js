const express = require("express");
const {
  registerUser,
  loginUser,
  getUserDetails,
  getAllUser,
  getSingleUser,
} = require("../controllers/userController");

const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router
  .route("/admin/users")
  .get(getAllUser);
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getSingleUser);
module.exports = router;
