const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompetitionSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Competition = mongoose.model("competitions", CompetitionSchema);