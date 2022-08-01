const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const footprintSchema = new Schema({
  footprint: Number,
});

const Footprint = mongoose.model("Footprint", footprintSchema);
module.exports = { mongoose, Footprint };
