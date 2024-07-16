import express from "express";
import { User } from "../models/user.js";
import { getUserbyId } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  register,
  //getUserbyDetail,
  //DeleteId,
  login,
  logout,
} from "../controllers/user.js";

const router = express.Router();

router.post("/new", register);

router.post("/login", login);

router.get("/logout", logout);

//router.get("/userid/special") is cae me pehle :id wala chalega agar pehle
//likh hoha to nahi to special pehle likhan pdega
//router.get("/userid/:id", getUserbyId);

//router.route("/userid/:id").get(getUserbyId);
//.put(getUserbyDetail)
//.delete(DeleteId);

 router.get("/me", isAuthenticated, getUserbyId);

//router.put("/userid/:id", getUserbyDetail);
//router.put("/userid/:id", DeleteId);

export default router;
