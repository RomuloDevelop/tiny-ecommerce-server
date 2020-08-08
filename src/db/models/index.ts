import path = require('path');
import {Sequelize, Model} from 'sequelize'
import ClientInit from "./client";
import ProductInit from "./product";
import CategoryMapInit from "./categorymap";
import ProductCategoryInit from "./product_category";
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable] as string, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const db = {
  sequelize,
  Sequelize,
  Client: ClientInit(sequelize),
  Product: ProductInit(sequelize),
  CategoryMap: CategoryMapInit(sequelize),
  Product_Category: ProductCategoryInit(sequelize)
}

Object.values(db).forEach((modelName) => {
  // @ts-ignore
  if (modelName.associate) {
    // @ts-ignore
    modelName.associate(db);
  }
});

export default db
