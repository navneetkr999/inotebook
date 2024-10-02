import jwt from "jsonwebtoken";
const JWT_SECRET = "Himynameis!123#";

const fetchuser = (req, res, next) => {
    // get the user from jwt token and add id to req object

    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({error: 'Please authenticate using valid token'});
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error: 'Please authenticate using valid token'});
    }

    // we call next() at the end so that our execution moves towards next middleware.
    // it tells that this middleware has completed it work now move on to next action
}

export default fetchuser;