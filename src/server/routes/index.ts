import passport from 'passport';
import IRouter from './shared/IRouter';
import express = require('express');
import AuthRoute from './AuthRoute';
import ClientRoute from './ClientRoute';
import CategoryRoute from './CategoryRoute';
import ProductRoute from './ProductRoute';
class Routes implements IRouter {
  private authRoute: AuthRoute;
  private clientRoute: ClientRoute;
  private categoryRoute: CategoryRoute;
  private productRoute: ProductRoute;
  private routers: express.Router;
  constructor() {
    this.authRoute = new AuthRoute();
    this.clientRoute = new ClientRoute();
    this.categoryRoute = new CategoryRoute();
    this.productRoute = new ProductRoute();
    this.routers = express.Router();
  }
  getRoutes() {
    return this.routers;
  }
  setRoutes() {
    this.authRoute.setRoutes();
    this.clientRoute.setRoutes();
    this.categoryRoute.setRoutes();
    this.productRoute.setRoutes();
    this.routers.use('/auth', this.authRoute.getRoutes());
    this.routers.use('/client', passport.authenticate('jwt', { session: false }), this.clientRoute.getRoutes());
    this.routers.use('/category', passport.authenticate('jwt', { session: false }), this.categoryRoute.getRoutes());
    this.routers.use('/product', passport.authenticate('jwt', { session: false }), this.productRoute.getRoutes());
    this.routers.get('/routes', (req, res) => res.send(this.listOfRoutes()));
    return this.routers;
  }
  listOfRoutes() {
    let route = [];
    const routes = [] as any;
    this.routers.stack.forEach(function (middleware) {
      if (middleware.route) {
        // routes registered directly on the app
        routes.push(middleware.route);
      } else if (middleware.name === 'router') {
        // router middleware
        middleware.handle.stack.forEach(function (handler: any) {
          route = handler.route;
          route && routes.push(route);
        });
      }
    });
    return routes;
  }
}

export default Routes;
