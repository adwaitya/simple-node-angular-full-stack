import * as express from 'express';
import { IServer } from '../interfaces/ServerInterface';
import UserRouter from './UserRouter';

/**
 * @export
 * @class Routes
 */

export default class Routes {
    /**
     * @static
     * @param {IServer} server
     * @memberof Routes
     */
  static init(server: IServer): void {
    const router: express.Router = express.Router();

    // users
    server.app.use('/v1/api/users', UserRouter.router);

    // index
    server.app.use('/', (req, res) => {
      res.send('test');
    });
    server.app.use(router);
  }
}
