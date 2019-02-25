import UserService from '../services/UserService/UserService';
import { HttpError } from '../config/error/index';
import { IUserModel } from '../models/UserModel';
import { IUserService } from '../interfaces/IuserService';
import { NextFunction, Request, Response } from 'express';

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
      const users: IUserModel[] = await this.service.findAll();

      return res.status(200).json(users);
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
      const user: IUserModel = await this.service.insert(req.body);

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
  async delete(req: Request, res: Response, next: NextFunction): Promise < Response > {
    try {
      const user: IUserModel = await this.service.delete(req.params.id);

      return res.status(200).json(user);
    } catch (error) {
      next(new HttpError(error.message.status, error.message));
    }
  }
}

export default new UserController(UserService);
