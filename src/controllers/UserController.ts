import * as jwt from 'jsonwebtoken';
import UserService from '../services/UserService/UserService';
import { HttpError } from '../config/error/index';
import { IUserModel } from '../models/UserModel';
import { IUserService } from '../interfaces/IuserService';
import { NextFunction, Request, Response } from 'express';
import { envConfig } from '../config/env/devlopment';
import { LoggedInUserModel } from '../models/logged-in-user.model';
import { TypedResponse, PaginationResponse } from '../models/base';

/**
 * @export
 * @class UserController
 */
class UserController {

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

    /**
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise < Response >}
     * @memberof UserController
     */
  async findAll(req: Request, res: Response, next: NextFunction): Promise < Response > {
    try {
      console.log('request', req.query);
      const page =  parseInt(req.query.page);
      const perpage =  parseInt(req.query.perpage);
      const users: IUserModel[] = await this.service.findAll(page, perpage);
      const totalRecords = await this.service.findTotalCount();
      const response:TypedResponse<IUserModel> = { data:users, isSuccess:true,
        pagination: <PaginationResponse>{
          page: parseInt(req.query.page),
          size: perpage,
          total: totalRecords,
        }, httpCode:200, errorHolder:null };
      return res.status(200).json(response);
    } catch (error) {
      next(new HttpError(error.message.status, error.message));
    }
  }

    /**
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise < Response >}
     * @memberof UserController
     */
  async find(req: Request, res: Response, next: NextFunction): Promise < Response > {
    try {
      const user: IUserModel = await this.service.find(req.params.id);

      return res.status(200).json(user);
    } catch (error) {
      next(new HttpError(error.message.status, error.message));
    }
  }

    /**
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise < Response >}
     * @memberof UserController
     */
  async create(req: Request, res: Response, next: NextFunction): Promise < Response > {
    try {
      const userexits: IUserModel = await this.service.findByEmail(req.body.email);
      if (userexits !== null) {
        return res.status(500).json({ model:null, isSuccess:false,
          message:'Email is already exits', errorHolder: null , httpCode:500 });
      }
      const user = await this.service.insert(req.body);
      if (user) {
        const tokenKey = await jwt.sign({ id: user._id }, envConfig.auth.secret, {
          expiresIn: 86400, // expires in 24 hours
        });
        const data: LoggedInUserModel = { email:user.email, name:user.name, token:tokenKey };
        return res.status(200).json({ model:data, isSuccess:true,
          message:'Registration successful', errorHolder: null , httpCode:201 });
      }

      return res.status(500).json({ model:null, isSuccess:false,
        message:'Email is already exits', errorHolder: null , httpCode:500 });
    } catch (error) {
      return res.status(500).json({ model:null, isSuccess:false,
        message:'Unable to create user', errorHolder: null , httpCode:500 });
    }
  }

    /**
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise < Response >}
     * @memberof UserController
     */
  async delete(req: Request, res: Response, next: NextFunction): Promise < Response > {
    try {
      const response = await this.service.delete(req.params.id);

      return res.status(200).json(response);
    } catch (error) {
      next(new HttpError(error.message.status, error.message));
    }
  }

}

export default new UserController(UserService);
