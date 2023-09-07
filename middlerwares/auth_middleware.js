import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

var SECRET = process.env.JWT_SECRET_KEY


const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// var checkingAuth = (model) => async (req, res, next) => {
//   let token;
//   const { authorization } = req.headers;
//   if (authorization && authorization.startsWith('Bearer')) {
//     try {
//       // Get Token from header
//       token = authorization.split(' ')[1];

//       // Verify Token
//       const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);

//       // Get User from Token using the provided model
//       req.user = await model.findById(userId).select('-password');

//       next();
//     } catch (error) {
//       console.log(error);
//       res.status(401).send({ "status": "failed", "message": "Unauthorized User" });
//     }
//   }
//   if (!token) {
//     res.status(401).send({ "status": "failed", "message": "Unauthorized User, No Token" });
//   }
// };


export default authenticateJwt;
