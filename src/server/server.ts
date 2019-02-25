import * as express from 'express';
import * as https from 'https';
import * as fs from 'fs';
import { default as config } from '../config/env/defaults';
import { default as Middleware } from '../config/middleware/middleware';
import { default as Routes } from '../router/routes';
/**
 * @export
 * @class Server
 */
export class Server {
  // set app to be of type express.Application
  public app: express.Application;

  /**
   * Create an Instance of server
   * @memberof Server
   */
  constructor() {
    this.app = express();
    this.config();
    Middleware.init(this);
    Routes.init(this);
    Middleware.initErrorHandler(this);
  }

  config() :void {
    const serverOption = {
      key: fs.readFileSync('./src/config/cert/selfsigned.key'),
      cert: fs.readFileSync('./src/config/cert/selfsigned.crt'),
    };
    const server = https.createServer(serverOption, this.app);
    server.listen(config.port, () => {
      console.log(`Started on port ${config.port}`);
    });
  }

}

export default new Server().app;
