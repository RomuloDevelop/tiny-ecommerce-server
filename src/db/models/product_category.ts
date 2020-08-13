import { Sequelize, Model, DataTypes, Optional } from 'sequelize';
import { ModelsType } from './index';

interface ProductCategoryAttributes {
  id: number;
  ProductId: number;
  CategoryMapId: number;
}

interface ProductCategoryCreationAttributes extends Optional<ProductCategoryAttributes, 'id'> {}
export default (sequelize: Sequelize) => {
  class Product_Category extends Model<ProductCategoryAttributes, ProductCategoryCreationAttributes> {
    id!: number;
    ProductId!: number;
    CategoryMapId!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: ModelsType) {
      // define association here
    }
  }
  Product_Category.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      ProductId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Product',
          key: 'id',
        },
      },
      CategoryMapId: {
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
