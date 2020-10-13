import express = require('express');
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import passportStrategy from './middlewares/passport';
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
    if (process.env.NODE_ENV === 'development') {
      this.devMiddlewares();
    }
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(passportStrategy(passport).initialize());
    this.routes();
  }

  devMiddlewares() {
    this.app.use(morgan('tiny'));
  }
}
