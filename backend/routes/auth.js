import express from "express";
import User from "../models/User.Schema.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fetchuser from "../middleware/fetchuser.js";

const authRouter = express.Router();
const JWT_SECRET = "Himynameis!123#";

// ROUTE 1: create a user using POST call /api/auth/createuser. No login required.
authRouter.post(
  "/createuser",
  [
    // adding validations for different values
    body("name", "Enter a valid name upto 3 characters length").isLength({
      min: 3,
    }),
    body("email", "Enter a valid email").isEmail(),
    body(
      "password",
      "Enter a valid password upto 5 characters length"
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    // If there are errors, return bad request with errors
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ result: result.array() });
    }
    try {
      // Check if user exist already with same email
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Email already exists, please enter a unique email" });
      }

      // hashing the password using bcrypt package
      const salt = await bcrypt.genSalt(10);
      const securedPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securedPass,
      });

      // using JWT authentication to create auth tokens
      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);

      res.json({ authToken });
    } catch (error) {
      res.status(500).send("Internal server error");
      console.error(error.message);
    }
  }
);

// ROUTE 2: authenticate a user using POST call /api/auth/login. No login required.
authRouter.post(
    "/login",
    [
        // adding validations for different values
        body("email", "Enter a valid email").isEmail(),
        body('password', 'Password cannot be blank').exists()
    ],
    async (req, res) => {
        // If there are errors, return bad request with errors
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ result: result.array() });
        }

        const {email, password} = req.body;

        try {
            let user = await User.findOne({email});
            if (!user) {
                return res.status(400).json({error: 'Please use correct credentials'});
            }

            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({error: 'Please use correct credentials'});
            }

            const data = {
                    user: {
                    id: user.id,
                    },
                };
            
            const authToken = jwt.sign(data, JWT_SECRET);
        
            res.json({ authToken });
        } catch (error) {
            res.status(500).send("Interal server error");
            console.error(error.message);
        }
    }
);

// ROUTE 3: get loggedin user details using: POST /api/auth/getuser. Login required
authRouter.post(
    "/getuser",
    fetchuser,
    async (req, res) => {
        try {
            const userId = req.user.id;
            const user = await User.findById(userId).select('-password'); // get all the details of user except password.
            res.send(user);
        } catch (error) {
            res.status(500).send("Interal server error");
            console.error(error.message);
        }
    }
);

export default authRouter;
