import IRouter from './shared/IRouter';
import Validator from './shared/Validator';
import ClientController from '../controllers/ClientController';
import express = require('express');

class CategoryRoute extends Validator implements IRouter {
  private router: express.Router;
  constructor() {
    super();
    this.router = express.Router();
  }
  getRoutes() {
    return this.router;
  }

  setRoutes() {
    const clientController = new ClientController();
    this.router
      .get('/', clientController.getClients)
      .get('/:id', clientController.getClient)
      .get('/:id/category', clientController.getCategory)
      .put('/', this.chainValidation(ClientController.fieldValidator()), clientController.updateClient);
    return this.router;
  }
}

export default CategoryRoute;
