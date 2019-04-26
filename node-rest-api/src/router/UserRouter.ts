import UserController from '../controllers/UserController';
import { Router } from 'express';
import { isUserAuthenticated } from '../config/middleware/AuthMiddleware';

/**
 * @export
 * @class UserRouter
 */
class UserRouter {
  public router: Router;

    /**
     * Creates an instance of UserRouter.
     * @memberof UserRouter
     */
  constructor() {
    this.router = Router();
    this.routes();
  }

    /**
     * @memberof UserRouter
     */
  public routes(): void {

    this.router.get('/', isUserAuthenticated, UserController.findAll.bind(UserController));
    this.router.get('/:id', isUserAuthenticated, UserController.find.bind(UserController));
    this.router.post('/', UserController.create.bind(UserController));
    this.router.delete('/:id', isUserAuthenticated, UserController.delete.bind(UserController));
  }
}

export default new UserRouter();
