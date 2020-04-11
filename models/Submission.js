const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubmissionSchema = new Schema({
  image: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  competition: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Submission = mongoose.model("submissions", SubmissionSchema);