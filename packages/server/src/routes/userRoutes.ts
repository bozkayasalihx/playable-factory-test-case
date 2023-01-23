import { Router } from "express";
import errorHandler from "../middlewares/errorHandler";
import loginController from "../controller/user/loginController";
import registerControler from "../controller/user/registerController";

const router = Router();

router.post("/login", errorHandler.handleErrors(loginController));
router.post("/register", errorHandler.handleErrors(registerControler));

export default router;
