const { text } = require("express");
const mongoose = require("mongoose");

const leadSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    source: {
      type: String,
    },
    status: {
      type: String,
      default: "new",
    },
    notes: [
      {
        text: String,
        date: Date,
      },
    ],
    followUpDate: {
      type: Date,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Lead", leadSchema);
