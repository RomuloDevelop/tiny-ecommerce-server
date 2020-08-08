import IRouter from './IRouter'
import ProductController from '../controllers/ProductController'
import express = require('express')

class ProductsRoutes implements IRouter {
  private router: express.Router
  constructor() {
    this.router = express.Router()
  }

  getRoutes() {
    return this.router
  }

  setRoutes() {
    const productController = new ProductController()
    this.router
    .get('/', productController.getProducts)
    .post('/', productController.insertProduct)
    return this.router
  }
}

export default ProductsRoutes
