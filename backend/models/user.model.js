const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    dateOfBirth: { type: Date, required: true },
    city: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "student"], default: "student" },
    courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);
module.exports = { UserModel };


// {
//     "name": "user1",
//     "email": "user1@gmail.com",
//     "dateOfBirth": "1990-01-01",
//     "city": "delhi",
//     "password": "user1", 
//     "role": "user1",
//   }
  