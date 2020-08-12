import db from '../../db/models';
import { Response, Request } from 'express';
import { body } from 'express-validator';
const { Client, CategoryMap } = db;

class ClientController {
  async getClients(req: Request, res: Response) {
    try {
      const clients = await Client.findAll();
      res.json(clients);
    } catch (err) {
      res.status(500).send(err.message);
      console.error(err);
    }
  }

  async getClient(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const client = await Client.findByPk(id);
      res.json(client);
    } catch (err) {
      res.status(500).send(err.message);
      console.error(err);
    }
  }

  async getCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const client = await CategoryMap.findAll({
        where: {
          client_id: id,
        },
      });
      res.json(client);
    } catch (err) {
      res.status(500).send(err.message);
      console.error(err);
    }
  }

  async insertClient(req: Request, res: Response) {
    try {
      const { name, description, image } = req.body;
      const client = await Client.create({
        name,
        description,
        image,
      });
      res.json(client);
    } catch (err) {
      res.status(500).send(err.message);
      console.error(err);
    }
  }

  static fieldValidator() {
    const validators = [body('name').not().isEmpty().trim(), body('description').trim().isLength({ min: 10 })];
    return validators;
  }
}

export default ClientController;
