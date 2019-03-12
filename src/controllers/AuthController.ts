import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { IUserService } from '../interfaces/IuserService';
import { Request, Response, NextFunction } from 'express-serve-static-core';
import { IUserModel } from '../models/UserModel';
import  { HttpError } from '../config/error/index';
import UserService from '../services/UserService/UserService';
import {  envConfig } from '../config/env/devlopment';
/**
 * @export
 * @class AuthController
 */
class AuthController {

      /**
     * @private
     * @type {IUserModelService}
     * @memberof UserController
     */
  private service: IUserService;

  /**
   * Creates an instance of UserController.
   * @param {IUserModelService} repository
   * @memberof UserController
   */
  constructor(service: IUserService) {
    this.service = service;
  }
  async login(req: Request, res: Response, next: NextFunction): Promise < Response >  {
    try {
      const user: IUserModel = await this.service.findByEmail(req.body.email);
      if (user === null) {
        return res.status(200).json({ suuceess:false, message:'User does not exits',
          token:null, email:req.body.email });
      }
      const passwordIsValid = await bcrypt.compare(req.body.password, user.password);
      if (!passwordIsValid) {
        return res.status(200).json({ suuceess:false, message:'Password is not correct',
          token:null, email:req.body.email });
      }
      const tokenKey = await jwt.sign({ id: user._id }, envConfig.auth.secret, {
        expiresIn: 86400, // expires in 24 hours
      });
      return res.status(200).json({ suuceess:true, message:'Signin Successful',
        token:tokenKey, email:req.body.email });
    } catch (error) {
      next(new HttpError(error.message.status, error.message));
    }
  }
}
export default new AuthController(UserService);
