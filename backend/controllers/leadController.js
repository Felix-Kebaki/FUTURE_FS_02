const Lead = require("../models/leadModel");

const setLeads = async (req, res) => {
  const { name, email, source } = req.body;
  try {
    if (!name || !email || !source) {
      return res.status(400).json({ error: "Input all fields" });
    }

    const emailExists = await Lead.findOne({ email });
    if (emailExists) {
      return res.status(409).json({ error: "Lead already exists" });
    }

    const lead = new Lead({
      name,
      email,
      source,
    });

    const saveLead = await lead.save();
    if (!saveLead) {
      return res.status(500).json({ error: "Unable to save lead" });
    }

    res.status(201).json({ message: "Lead saved successfully" });
  } catch (error) {
    console.error(error.message || error);
    res.status(500).json({ error: "Server side error" });
  }
};

const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find();
    if (!leads) {
      return res.status(404).json({ error: "Unable to fetch data" });
    }

    res.status(200).json(leads);
  } catch (error) {
    console.error(error.message || error);
    res.status(500).json({ error: "Server side error" });
  }
};

const contactLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    lead.status = "contacted";

    const statusToContacted = await lead.save();
    if (!statusToContacted) {
      return res.status(500).json({ error: "Unable to save changes" });
    }
    res.status(200).json({ message: "Lead is contacted" });
  } catch (error) {
    console.error(error.message || error);
    res.status(500).json({ error: "Server side error" });
  }
};

const takeNotesAndFollowups = async (req, res) => {
  const { text, followUpDate } = req.body;
  try {
    if (!text || !followUpDate) {
      return res.status(400).json({ error: "Input all fields" });
    }
    const lead = await Lead.findOne({
      _id: req.params.id,
      status: "contacted",
    });
    if (!lead) {
      return res.status(404).json({ error: "Lead not found" });
    }

    lead.followUpDate = followUpDate;
    lead.notes.push({
      text,
      date: new Date(),
    });

    const addnote = await lead.save();
    if (!addnote) {
      return res.status(500).json({ error: "Unable to add note" });
    }

    res.status(201).json({ message: "Note created successfully" });
  } catch (error) {
    console.error(error.message || error);
    res.status(500).json({ error: "Server side error" });
  }
};

const customerAcquired = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ error: "Unable to fetch lead" });
    }

    lead.status = "converted";
    const convertedUsers = await lead.save();
    if (!convertedUsers) {
      return res.status(500).json({ error: "Unable to convert lead" });
    }

    res.status(200).json({ message: "Lead converted successfully" });
  } catch (error) {
    console.error(error.message || error);
    res.status(500).json({ error: "Server side error" });
  }
};

const deleteLead = async (req, res) => {
  try {
    const deleteSuccess = await Lead.findByIdAndDelete(req.params.id);
    if (!deleteSuccess) {
      return res.status(500).json({ error: "Unable to delete lead" });
    }

    res.status(200).json({ message: "Lead deleted successfully" });
  } catch (error) {
    console.error(error.message || error);
    res.status(500).json({ error: "Server side error" });
  }
};

module.exports = {
  setLeads,
  getLeads,
  contactLead,
  takeNotesAndFollowups,
  customerAcquired,
  deleteLead,
};
