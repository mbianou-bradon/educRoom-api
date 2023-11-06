import Express from "express";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getOneCourse,
  updateCourse,
} from "../../controllers/courseControllers/courseController";

const router = Express.Router();

// Get all get Courses from database
router.get("/", getAllCourses);

// Get a single Course by ID from database
router.get("/:id", getOneCourse);

// Create a Course and add to the database
router.post("/", createCourse);

// Update a Course information in Database
router.patch("/:id", updateCourse);

// Delete a Course from Database
router.delete("/:id", deleteCourse);

export default router;
