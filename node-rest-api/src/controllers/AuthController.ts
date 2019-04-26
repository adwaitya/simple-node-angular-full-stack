import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { IUserService } from '../interfaces/IuserService';
import { Request, Response, NextFunction } from 'express-serve-static-core';
import UserModel, { IUserModel } from '../models/UserModel';
import  { HttpError } from '../config/error/index';
import UserService from '../services/UserService/UserService';
import {  envConfig } from '../config/env/devlopment';
import { ReturnModel } from '../models/return.model';
import { LoggedInUserModel } from '../models/logged-in-user.model';
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
      console.log('user', user);
      let data: LoggedInUserModel = { email:user.email, name:user.name, token:null };
      if (user == null) {
        console.log('user --');
        return res.status(500).json({ model:data, isSuccess:false,
          message:'User does not exits', errorHolder: null , httpCode:500 });
      }
      const passwordIsValid = await bcrypt.compare(req.body.password, user.password);
      if (!passwordIsValid) {
        return res.status(500).json({ model:data, isSuccess:false,
          message:'Password is not correct', errorHolder: new Error('Password is not correct') , httpCode:401 });
      }
      const tokenKey = await jwt.sign({ id: user._id }, envConfig.auth.secret, {
        expiresIn: 86400, // expires in 24 hours
      });
      data = { email:user.email, name:user.name, token:tokenKey };
      return res.status(200).json({ model:data , isSuccess:true,
        message:'Sign in successful', errorHolder: null , httpCode:200 });
    } catch (error) {
      // next(new HttpError(error.message.status, error.message));
      return res.status(500).json({ model:null, isSuccess:false,
        message:'Username or password is not correct', errorHolder: new Error('User does not exits') , httpCode:500 });

    }
  }
}
export default new AuthController(UserService);
