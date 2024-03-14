const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const lectureSchema = new Schema(
  {
    title: { type: String, required: true },
    courseName: {type: String, required: true},
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    description: { type: String },
    joinLink: { type: String },
  },
  { timestamps: true }
);

const LectureModel = mongoose.model("Lecture", lectureSchema);
module.exports = { LectureModel };


