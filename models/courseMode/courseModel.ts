import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Course title required"],
    unique: [true, "Course title already exist"],
  },
  description: {
    type: String,
    required: [true, "Course description required"],
  },
  thumbnail: {
    type: String,
    required: [true, "Add course thumbnail"],
  },
  duration: {
    type: String,
    required: [true, "Course duration required"],
  },
  schedule: {
    type: String,
    required: [true, "Course schedule required!"],
  },
  prerequirsites: {
    type: [String],
    required: [true, "Course schedule required!"],
  },
  syllabus: [
    {
      week: { type: String, required: [true, "Course week required!"] },
      topic: { type: String, required: [true, "Course topic required!"] },
      content: { type: String, required: [true, "Syllabus content required!"] },
    },
  ],
  enrollmentStatus: {
    type: String,
    required: [true, "Course  enrollment status is required"],
  },
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
