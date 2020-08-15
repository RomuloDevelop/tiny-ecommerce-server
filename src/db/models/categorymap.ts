import { Sequelize, Model, DataTypes, Optional, QueryTypes } from 'sequelize';
import { ModelsType } from './index';

interface CategoryMapAttributes {
  id: number;
  client_id: number;
  node_id: number;
  lft: number;
  rgt: number;
  parent_id: number;
  name: string;
}
interface CategoryMapCreationAttributes extends Optional<CategoryMapAttributes, 'id'> {}
export default (sequelize: Sequelize) => {
  class CategoryMap extends Model<CategoryMapAttributes, CategoryMapCreationAttributes> {
    public id!: number;
    public client_id!: number;
    public node_id!: number;
    public lft!: number;
    public rgt!: number;
    public parent_id!: number;
    public name!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: ModelsType) {
      // define association here
      this.belongsToMany(models.Product, { through: 'Product_Category' });
    }

    static createNodeId(clientId: number) {
      return sequelize.query(`select get_last_node_id(${clientId})`);
    }
    static createNode(clientId: number, parent: number, name: string) {
      return sequelize.query(`select * from insert_category(${parent}, ${clientId}, '${name}')`, {
        type: QueryTypes.SELECT,
      }) as Promise<CategoryMapAttributes[]>;
    }
    static deleteNode(clientId: number, node: number) {
      return sequelize.query(`select * from delete_category(${node}, ${clientId})`, {
        type: QueryTypes.SELECT,
      }) as Promise<CategoryMapAttributes[]>;
    }
  }
  CategoryMap.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      client_id: DataTypes.INTEGER,
      node_id: DataTypes.INTEGER,
      lft: DataTypes.INTEGER,
      rgt: DataTypes.INTEGER,
      parent_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'CategoryMap',
    }
  );
  return CategoryMap;
};
