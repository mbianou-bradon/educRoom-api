import Express from "express";
import {
  LoginUser,
  SignUpUser,
} from "../../controllers/authControllers/authController";

const router = Express.Router();

// Login Users
router.post("/login", LoginUser);

// SignUp users
router.post("/signup", SignUpUser);

export default router;
