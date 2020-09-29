import express = require('express');
interface IRouter {
  getRoutes: () => express.Router;
  setRoutes: () => express.Router;
}

export default IRouter;
