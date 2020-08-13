import { Sequelize, Model, DataTypes, Optional } from 'sequelize';
import { ModelsType } from './index';
interface ProductAttributes {
  id: number;
  client_id: number;
  title: string;
  description: string;
  image: string;
  price: number;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> {}
export default (sequelize: Sequelize) => {
  class Product extends Model<ProductAttributes, ProductCreationAttributes> {
    id!: number;
    client_id!: number;
    title!: string;
    description!: string;
    image!: string;
    price!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: ModelsType) {
      // define association here
      this.belongsToMany(models.CategoryMap, { through: 'Product_Category' });
    }
  }
  Product.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      client_id: DataTypes.INTEGER,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      image: DataTypes.STRING,
      price: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: 'Product',
    }
  );
  return Product;
};
