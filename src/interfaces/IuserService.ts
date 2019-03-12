import { IUserModel } from '../models/UserModel';

/**
 * @export
 * @interface IUserService
 */
export interface IUserService {

    /**
     * @returns {Promise<IUserModel[]>}
     * @memberof IUserService
     */
  findAll(): Promise<IUserModel[]>;

    /**
     * @param {string} code
     * @returns {Promise<IUserModel>}
     * @memberof IUserService
     */
  find(code: string): Promise<IUserModel>;

    /**
     * @param {string} email
     * @returns {Promise<IUserModel>}
     * @memberof IUserService
     */
  findByEmail(email: string): Promise<IUserModel>;

    /**
     * @param {IUserModel} IUserModel
     * @returns {Promise<IUserModel>}
     * @memberof IUserService
     */
  insert(iUserModel: IUserModel): Promise<IUserModel>;

    /**
     * @param {string} id
     * @returns {Promise<IUserModel>}
     * @memberof IUserService
     */
  delete(id: string): Promise<IUserModel>;
}
