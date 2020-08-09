import express = require('express');
import morgan from 'morgan';
import { Sequelize } from 'sequelize';
import sqlFunctions from '../db/models/functions';
import Routes from './routes';
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
      const sequelize = new Sequelize('lykos_development', 'postgres', 'Gabriel-00', {
        host: '127.0.0.1',
        dialect: 'postgres',
      });
      this.middlewares();
      await this.loadDBFunctionsAndProcedures(sequelize);
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
  async loadDBFunctionsAndProcedures(sequelize: Sequelize) {
    await sqlFunctions(sequelize);
  }
}
