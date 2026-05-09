const Admin = require("../models/adminModel");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Input all fields" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ error: "Admin not registered" });
    }

    const checkPassword = await bcrypt.compare(password, admin.password);
    if (!checkPassword) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    generateToken(res, admin._id);

    res.status(200).json({
      message: "Logged in successfully",
      Admin: { ...admin._doc, password: undefined },
    });
  } catch (error) {
    console.error(error.message || error);
    res.status(500).json({ error: "Server side error" });
  }
};

const logoutAdmin = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error.message || error);
    res.status(500).json({ error: "Server side error" });
  }
};

const getAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      res.status().json({ error: "Unable to fetch admin" });
    }

    res.status(200).json({ ...admin._doc, password: undefined });
  } catch (error) {
    console.error(error.message || error);
    res.status(500).json({ error: "Server side error" });
  }
};

const getMe = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user._id);
    const me = {
      ...admin._doc,
      password: undefined,
    };
    
    res.status(200).json(me)
  } catch (error) {
    console.error(error.message || error);
    res.status(500).json({ error: "Server side error" });
  }
};

module.exports = { loginAdmin, logoutAdmin, getAdmin ,getMe};
