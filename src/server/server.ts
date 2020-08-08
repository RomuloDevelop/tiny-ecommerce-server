import express = require('express')
import morgan from 'morgan'
import {Sequelize} from 'sequelize';
import Routes from './routes'
export default class Server {
  public app: express.Application
  public port: number;

  constructor(port: number) {
    this.port = port
    this.app = express()
  }

  static init(port: number) {
    return new Server(port)
  }

  start(cb: () => void) {
    const sequelize = new Sequelize('lykos_development', 'postgres', 'Gabriel-00', {
      host: '127.0.0.1',
      dialect: 'postgres'
    });
    this.middlewares()
    this.app.listen(this.port, cb)
  }
  routes() {
    const routes = new Routes()
    routes.setRoutes()
    this.app.use('/api',routes.getRoutes())
    this.app.get('/', (req, resp) => resp.send('Welcome'))
  }
  middlewares() {
    this.app.use(morgan('tiny'))
    this.app.use(express.json())
    this.routes()
  }
}