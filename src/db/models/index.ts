import { Sequelize } from 'sequelize';
import sqlFunctions from './functions';
import ClientInit from './client';
import ProductInit from './product';
import CategoryMapInit from './categorymap';
import ProductCategoryInit from './product_category';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const configjs = require('../config/config');
const env = process.env.NODE_ENV || 'development';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const config = (configjs as any)[env];
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(config.use_env_variable as string, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const tables = {
  Client: ClientInit(sequelize),
  Product: ProductInit(sequelize),
  CategoryMap: CategoryMapInit(sequelize),
  Product_Category: ProductCategoryInit(sequelize),
};

type ModelsType = typeof tables;

Object.values(tables).forEach((modelName) => {
  if (modelName.associate) {
    modelName.associate(tables);
  }
});

const db = {
  sequelize,
  Sequelize,
  async loadDBFunctionsAndProcedures() {
    await sqlFunctions(this.sequelize);
  },
  ...tables,
};

export { ModelsType };

export default db;
