import IRouter from './shared/IRouter';
import Validator from './shared/Validator';
import AuthController from '../controllers/AuthController';
import express = require('express');

class AuthRoute extends Validator implements IRouter {
  private router: express.Router;
  constructor() {
    super();
    this.router = express.Router();
  }
  getRoutes() {
    return this.router;
  }

  setRoutes() {
    const authController = new AuthController();
    this.router.post('/', authController.login);
    this.router.post('/register', authController.registerClient);
    return this.router;
  }
}

export default AuthRoute;
