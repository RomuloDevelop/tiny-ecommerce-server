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
} from 'sequelize';

interface ClientAttributes {
  name: string;
  description: string;
  image: string;
}

export default (sequelize: Sequelize) => {
  class Client extends Model<ClientAttributes> implements ClientAttributes {
    public name!: string;
    public description!: string;
    public image!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any) {
      // define association here
      this.hasMany(models['Product'], { foreignKey: 'client_id' });
      this.hasMany(models['CategoryMap'], { foreignKey: 'client_id' });
    }
  }
  Client.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Client',
    }
  );
  return Client;
};
