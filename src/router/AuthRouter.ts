
import { Router } from 'express';
import AuthController from '../controllers/AuthController';

/**
 * @export
 * @class AuthRouter
 */
class AuthRouter {
  public router: Router;

    /**
     * Creates an instance of AuthRouter.
     * @memberof AuthRouter
     */
  constructor() {
    this.router = Router();
    this.routes();
  }

    /**
     * @memberof AuthRouter
     */
  public routes(): void {

    this.router.post('/signin', AuthController.login.bind(AuthController));
  }
}

export default new AuthRouter();
