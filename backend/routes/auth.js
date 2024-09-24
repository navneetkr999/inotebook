import express from 'express'; 
import User from '../models/User.Schema.js';

const authRouter = express.Router();

// create a user using POST call /api/auth. Does not require auth.
authRouter.post('/', (req, res) => {
    console.log(req.body);
    const user = User(req.body);
    user.save();
    res.send(req.body);
})

export default authRouter;