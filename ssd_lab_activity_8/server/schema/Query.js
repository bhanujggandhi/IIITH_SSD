const mongoose = require("mongoose");

const QuerySchema = mongoose.Schema({
  roll: { type: String, required: true },
  exam_name: {
    type: String,
    required: true,
  },
  course_name: {
    type: String,
    required: true,
  },
  question_num: {
    type: String,
    required: true,
  },
  ta_roll: {
    type: String,
    required: true,
  },
  std_roll: {
    type: String,
    required: true,
  },
  ta_comment: {
    type: String,
  },
  std_comment: {
    type: String,
  },
  IsActive: {
    type: Boolean,
  },
});

module.exports = mongoose.model("query", QuerySchema);
