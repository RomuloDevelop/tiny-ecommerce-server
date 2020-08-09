import { Sequelize, Model, DataTypes } from 'sequelize';

export default (sequelize: Sequelize) => {
  class Product_Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  }
  Product_Category.init(
    {
      product_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Product',
          key: 'id',
        },
      },
      category_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'CategoryMap',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Product_Category',
    }
  );
  return Product_Category;
};
