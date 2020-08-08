import IRouter from './IRouter'
import express = require('express')

class CategoryRoute implements IRouter {
    private router: express.Router
    constructor() {
        this.router = express.Router()
    }
    getRoutes() {
        return this.router
    }

    setRoutes() {
        this.router.get('/', (request, response) => {
            response.send('Hello get category!');
          });
          return this.router
    }    
}

export default CategoryRoute
