import { Student } from "../../models";
import Express from "express";
import * as bcryptjs from "bcryptjs";
import e from "express";

/**
 * LoginUser - Module to Login users that's both Teachers, Administration and Student
 * @req : Incoming request argument (userID, and userPassword)
 * @res : response argument (Can either be Positive or Negative)
 * @next : Function that proceed to the next Middleware
 *
 * Return : return the fetched data if positive or error message if fails
 *
 */
export const LoginUser = async (
  req: Express.Request,
  res: Express.Response,
  next: any
) => {
  const { email, password } = req.body;

  console.log({
    email: email,
    userPassword: password,
  });
  try {
    const user = await Student.findOne({ email: email });

    if (!user)
      return next(res.status(404).json({ message: "User does not exist" }));

    const hashPassword = user.password!;

    const response = await bcryptjs.compare(password, hashPassword);

    let structuredUser = {
      id: user._id,
      name: user?.name,
      email: user.email,
      town: user.town,
      phoneNumber: user.phoneNumber,
      country: user.country,
      profileImage: user.profileImage,
      role: user.role,
    };

    return next(
      res.status(response ? 200 : 401).json({
        status: response ? "OK" : "error",
        message: response ? "Login Successfully!" : "Invalid Credentials",
        user: response ? structuredUser : null,
      })
    );
  } catch (error: any) {
    return next(
      res.status(400).json({
        message: error,
      })
    );
  }
};

/**
 * SignUpUser - Module to Create new users that's both Teachers, Student
 * @req : Incoming request argument
 * @res : response argument
 * @next : Function that proceed to the next Middleware (Either Teacher or Student)
 *
 * Return : return the fetched data if positive or error message if fails
 *
 */
export const SignUpUser = async (
  req: Express.Request,
  res: Express.Response,
  next: any
) => {};
