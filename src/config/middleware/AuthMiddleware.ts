import * as jwt from 'jsonwebtoken';
import {  envConfig } from '../env/devlopment';
export const isUserAuthenticated = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(403).json({
      status: 403,
      message: 'FORBIDDEN',
      success:false,
    });
  }
//   const isTokenValid =  jwt.verify(authHeader, envConfig.auth.secret);
  jwt.verify(authHeader, envConfig.auth.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: 'UNAUTHORIZED',
      });
    }
    req.decoded = decoded;
    next();
  });
};
