import {
  Sequelize,
  Model,
  ModelDefined,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  Association,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Optional,
  BelongsToManyOptions,
} from 'sequelize';

interface ProductAttributes {
  client_id: number;
  title: string;
  description: string;
  image: string;
  price: number;
}

export default (sequelize: Sequelize) => {
  class Product extends Model<ProductAttributes> implements ProductAttributes {
    client_id!: number;
    title!: string;
    description!: string;
    image!: string;
    price!: number;
    static associate(models: any) {
      // define association here
      this.belongsToMany(models['CategoryMap'], { through: models['Product_Category'] });
    }
  }
  Product.init(
    {
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
