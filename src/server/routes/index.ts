import IRouter from './IRouter'
import express = require('express')
import ClientRoute from './ClientRoute'
import CategoryRoute from './CategoryRoute'
import ProductRoute from './ProductRoute'
class Routes implements IRouter {
    private clientRoute: ClientRoute
    private categoryRoute: CategoryRoute
    private productRoute: ProductRoute
    private routers: express.Router
    constructor() {
        this.clientRoute = new ClientRoute
        this.categoryRoute = new CategoryRoute
        this.productRoute = new ProductRoute
        this.routers = express.Router()
    }
    getRoutes() {
     return this.routers
    }
    setRoutes() {
        this.clientRoute.setRoutes()
        this.categoryRoute.setRoutes()
        this.productRoute.setRoutes()
        this.routers.use('/client',this.clientRoute.getRoutes())
        this.routers.use('/category',this.categoryRoute.getRoutes())
        this.routers.use('/product',this.productRoute.getRoutes())
        this.routers.get('/routes', (req, resp) => resp.send(this.listOfRoutes()))
        return this.routers
    }
    listOfRoutes() {
        let route, routes = [] as any;
        this.routers.stack.forEach(function(middleware){
            if(middleware.route){ // routes registered directly on the app
                routes.push(middleware.route);
            } else if(middleware.name === 'router'){ // router middleware 
                middleware.handle.stack.forEach(function(handler: any){
                    route = handler.route;
                    route && routes.push(route);
                });
            }
        });
        return routes
    }
}

export default Routes