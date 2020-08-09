import IRouter from './IRouter';
import ProductController from '../controllers/ProductController';
import express = require('express');
import Validator from './Validator';
class ProductsRoutes extends Validator implements IRouter {
  private router: express.Router;
  constructor() {
    super();
    this.router = express.Router();
  }

  getRoutes() {
    return this.router;
  }

  setRoutes() {
    const productController = new ProductController();
    this.router
      .get('/', productController.getProducts)
      .get('/:id', productController.getProduct)
      .post('/', this.chainValidation(ProductController.fieldValidator()), productController.insertProduct);
    return this.router;
  }
}

export default ProductsRoutes;
