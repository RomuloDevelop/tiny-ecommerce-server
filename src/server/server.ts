import express = require('express');
import morgan from 'morgan';
import Routes from './routes';
import db from '../db/models';
export default class Server {
  public app: express.Application;
  public port: number;

  constructor(port: number) {
    this.port = port;
    this.app = express();
  }

  static init(port: number) {
    return new Server(port);
  }

  async start(cb: () => void) {
    try {
      this.middlewares();
      await db.loadDBFunctionsAndProcedures();
      this.app.listen(this.port, cb);
    } catch (err) {
      console.error(err);
    }
  }
  routes() {
    const routes = new Routes();
    routes.setRoutes();
    this.app.use('/api', routes.getRoutes());
    this.app.get('/', (req, res) => res.send('Welcome'));
  }
  middlewares() {
    this.app.use(morgan('tiny'));
    this.app.use(express.json());
    this.routes();
  }
}
