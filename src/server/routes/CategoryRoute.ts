import IRouter from './IRouter';
import Validator from './Validator';
import CategoryMapController from '../controllers/CategoryMapController';
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
    const categoryController = new CategoryMapController();
    this.router
      .get('/', categoryController.getCategories)
      .get('/:id', categoryController.getCategory)
      .get('/:id/products', categoryController.getProducts)
      .post('/', this.chainValidation(CategoryMapController.fieldValidator()), categoryController.insertCategory)
      .delete('/:id', categoryController.deleteCategory);
    return this.router;
  }
}

export default CategoryRoute;
