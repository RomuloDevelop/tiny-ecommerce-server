import bcrypt from 'bcrypt';
import { Sequelize, Model, DataTypes, Optional } from 'sequelize';
import { ModelsType } from './index';

interface ClientAttributes {
  id: number;
  name: string;
  description: string;
  image: string;
  password: string;
}

interface ClientUpdateAttributes extends Partial<Omit<ClientAttributes, 'id'>> {}

interface ClientCreationAttributes extends Optional<ClientAttributes, 'id'> {}

export default (sequelize: Sequelize) => {
  class Client extends Model<ClientAttributes, ClientCreationAttributes> {
    public id!: number;
    public name!: string;
    public description!: string;
    public image!: string;
    public password!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: ModelsType) {
      // define association here
      this.hasMany(models.Product, { foreignKey: 'client_id' });
      this.hasMany(models.CategoryMap, { foreignKey: 'client_id' });
    }

    async comparePassword(password: string) {
      return await bcrypt.compare(password, this.password);
    }
  }
  Client.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      image: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      hooks: {
        async beforeValidate(client) {
          if (client.changed('password')) {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(client.password, salt);
            client.password = hashPassword;
          }
        },
      },
      sequelize,
      modelName: 'Client',
    }
  );
  return Client;
};
export { ClientCreationAttributes, ClientUpdateAttributes };
