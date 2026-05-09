const express = require("express");
const router = express.Router();

const {
  loginAdmin,
  logoutAdmin,
  getAdmin,
  getMe
} = require("../controllers/adminController");
const Protect = require("../middleware/authMiddleware");

router.post("/loginAdmin", loginAdmin);
router.post("/logoutAdmin", Protect, logoutAdmin);
router.get("/getAdmin/:id", Protect, getAdmin);
router.get("/me", Protect, getMe);

module.exports = router;
