import mongoose from "mongoose";
import { Course } from "../../models";
import Express from "express";

/**
 * getAllCourses - Get all Courses from the Database and sort it from latest to oldest
 * @req : Incoming request argument
 * @res : response argument
 * @next : Function that proceed to the next Middleware
 *
 * Return : return the fetched data if positive or error message if fails
 *
 */
export const getAllCourses = async (
  req: Express.Request,
  res: Express.Response,
  next: any
) => {
  try {
    let query = {};

    const allCourses = await Course.find(query).sort({ courseCode: 1 });

    return next(
      res.status(200).json({
        status: "OK",
        count: allCourses.length,
        course: allCourses,
      })
    );
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

/**
 * getOneCourse - Get One Course from the Database with a particular id
 * @req : Incoming request argument
 * @res : response argument
 * @next : Function that proceed to the next Middleware
 *
 * Return : return the fetched data if positive or error message if fails
 *
 */
export const getOneCourse = async (
  req: Express.Request,
  res: Express.Response,
  next: any
) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(
      res.status(404).json({
        message: "Invalid id!",
      })
    );
  }

  const course = await Course.findById(id);

  if (!course) {
    return next(
      res.status(404).json({
        message: "Course Not Found!",
      })
    );
  }

  return next(
    res.status(200).json({
      status: "OK",
      data: course,
    })
  );
};

/**
 * createCourse - Create a new Course with information gotten from the request body
 * @req : Incoming request argument
 * @res : response argument
 * @next : Function that proceed to the next Middleware
 *
 * Return : return the created data if positive or error message if fails
 *
 */
export const createCourse = async (
  req: Express.Request,
  res: Express.Response,
  next: any
) => {
  const newCourseData = req.body;

  try {
    const newCourse = await Course.create(newCourseData);

    return next(
      res.status(200).json({
        message: "Course created successfull!",
      })
    );
  } catch (error: any) {
    return next(
      res.status(400).json({
        message: error.message,
      })
    );
  }
};

/**
 * updateCourse - Update a particular Course info with id gotten from request params
 * @req : Incoming request argument
 * @res : response argument
 * @next : Function that proceed to the next Middleware
 *
 * Return : return the fetched data if positive or error message if fails
 *
 */
export const updateCourse = async (
  req: Express.Request,
  res: Express.Response,
  next: any
) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({
      message: "Invalid id!",
    });
  }

  const course = await Course.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!course) {
    return next(
      res.status(404).json({
        message: "Course not found!",
      })
    );
  }

  return next(
    res.status(200).json({
      status: "OK",
      message: "Course Information successfully Updated!",
    })
  );
};

/**
 * deleteCourse - find a Course by id and delete it from the database
 * @req : Incoming request argument
 * @res : response argument
 * @next : Function that proceed to the next Middleware
 *
 * Return : return a positive message if successfull or error message if fails
 *
 */
export const deleteCourse = async (
  req: Express.Request,
  res: Express.Response,
  next: any
) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(
      res.status(404).json({
        message: "Invalid id!",
      })
    );
  }

  const course = await Course.findByIdAndDelete(id);

  if (!course) {
    return next(
      res.status(404).json({
        message: "Course not found!",
      })
    );
  }

  return next(
    res.status(200).json({
      status: "OK",
      message: "Course deleted successfully!",
    })
  );
};
