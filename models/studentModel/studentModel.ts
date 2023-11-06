import mongoose from "mongoose";
import * as bcryptjs from "bcryptjs";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Student Name required"],
  },
  email: {
    type: String,
    required: [true, "Email Address required"],
    unique: [true, "Email Address already exist"],
  },
  profileImage: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  town: {
    type: String,
    required: [true, "Student must be in a town"],
  },
  country: {
    type: String,
    required: [true, "Student country must be known"],
  },
  role: {
    type: String,
    required: [true, "User role required"],
  },
  password: {
    type: String,
    required: [true, "Please insert a password"],
  },
  confirmPassword: {
    type: String,
    required: [true, "Please confirm Password"],
  },
});

studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const password = this.password!;
  this.password = await bcryptjs.hash(password, 10);
  this.confirmPassword = "0";
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
