import express from "express";
import User from "../models/User.Schema.js";
import { body, validationResult } from "express-validator";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

const authRouter = express.Router();
const JWT_SECRET = 'Himynameis!123#'

// create a user using POST call /api/auth/createuser. No login required.
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
            return res.status(400).json({ error: "Email already exists, please enter a unique email" })
        }

        // hashing the password using bcrypt package
        const salt = await bcrypt.genSalt(10);
        const securedPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: securedPass,
        })

        const data = {
            user: {
                id: user.id
            }
        }
        
        const authToken = jwt.sign(data, JWT_SECRET);

        res.json({authToken});
    } catch (error) {
        res.status(500).send('Some error occuered');
        console.error(error.message);
    }
  }
);

export default authRouter;
