const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    // lectures: [{ type: Schema.Types.ObjectId, ref: "Lecture" }],
    duration: { type: String, required: true },
  },
  { timestamps: true }
);

const CourseModel = mongoose.model("Course", courseSchema);
module.exports = { CourseModel };
