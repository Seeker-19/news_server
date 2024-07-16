import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/feature.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";

// export const getAllUsers = async (req, res) => {
//   /*const users = await User.find({});

//   console.log(req.query.keyword);
//   res.json({
//     success: true,
//     users: users,
//   });*/
// };

export const getUserbyId = async (req, res) => {
  
  try {
    //const id = "myid";

    res.status(201).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  /* const users = await User.find({});
  res.json({
    success: true,
    users: users,
  });*/
  // there exists no post method in browser .

  /*const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  res.status(201).cookie("temp1", "lol").json({
    success: true,
    message: "registered",
  });
  */

  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return next(new ErrorHandler("user already exists", 404));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: hashedPassword });

    sendCookie(user, res, "registered successfully", 201);
  } catch (error) {
    //next(error);

    console.log(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    /*if (!user) {
    return res.status(404).json({
      success: false,
      message: "Invalid Email or Password",
    });
  }*/

    if (!user) {
      return next(new ErrorHandler("Invalid Email or Password", 404));
    }

    const isMatch = bcrypt.compare(password, user.password);

    /*if (!isMatch) {
    return res.status(404).json({
      success: false,
      message: "Invalid Email or Password",
    });
  }*/
    if (!isMatch) {
      return next(new ErrorHandler("Invalid Email", 404));
    }

    sendCookie(user, res, `Welcome back ${user.name}`, 201);
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res, next) => {
  try {
    res
      .status(201)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
      })
      .json({
        success: true,
        user: req.user,
      });
  } catch (error) {
    next(error);
  }
};
