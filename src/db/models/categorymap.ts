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
} from "sequelize";

export default (sequelize: Sequelize) => {
  class CategoryMap extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  };
  CategoryMap.init({
    client_id: DataTypes.INTEGER,
    node_id: DataTypes.INTEGER,
    lft: DataTypes.INTEGER,
    rgt: DataTypes.INTEGER,
    parent_id: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CategoryMap',
  });
  return CategoryMap;
};