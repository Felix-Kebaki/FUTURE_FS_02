const express = require("express");
const Protect = require("../middleware/authMiddleware");
const {
  setLeads,
  getLeads,
  deleteLead,
  customerAcquired,
  contactLead,
  takeNotesAndFollowups,
} = require("../controllers/leadController");
const router = express.Router();

router.post("/setLeads", setLeads);
router.post("/contactLead/:id", Protect, contactLead);
router.post("/saveNotes/:id", Protect, takeNotesAndFollowups);
router.get("/getLeads", Protect, getLeads);
router.post("/acquireCustomer/:id", Protect, customerAcquired);
router.delete("/deleteLead/:id", Protect, deleteLead);

module.exports=router