import db from '../../db/models';
import { Response, Request } from 'express';
import { body } from 'express-validator';
import type { ClientUpdateAttributes } from '../../db/models/client';
const { Client, CategoryMap } = db;

class ClientController {
  async getClients(req: Request, res: Response) {
    try {
      const clients = await Client.findAll({
        attributes: {
          exclude: ['password'],
        },
      });
      res.json(clients);
    } catch (err) {
      res.status(500).send(err.message);
      console.error(err);
    }
  }

  async getClient(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const client = await Client.findByPk(id, {
        attributes: {
          exclude: ['password'],
        },
      });
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
  async updateClient(req: Request, res: Response) {
    try {
      const { id } = req.body;
      if (!id) {
        res.status(401).send('An id in needed');
      }
      const params: ClientUpdateAttributes = {};
      for (const key in req.body) {
        if (key === 'name' || key === 'description' || key === 'image' || key === 'password') {
          params[key] = req.body[key];
        }
      }
      await Client.update(params, { where: { id } });
      res.status(200).send('Client updated');
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
