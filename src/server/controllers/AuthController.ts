import jwt from 'jsonwebtoken';
import db from '../../db/models';
import { Response, Request } from 'express';
import { body } from 'express-validator';
const { Client } = db;

class AuthController {
  async login(req: Request, res: Response) {
    try {
      const message = 'Name or password incorrect';
      const { name, password } = req.body;
      const client = await Client.findOne({ where: { name } });
      if (client != null) {
        const exist = await client.comparePassword(password);
        if (exist) {
          const token = jwt.sign(client.toJSON(), process.env.JWT_SECRET_OR_KEY as string, {
            expiresIn: process.env.JWT_TOKEN_EXPIRATION,
          });
          res.status(200).send({ success: true, client, token });
        } else {
          res.status(401).send({ success: false, message });
        }
      } else {
        res.status(401).send({ success: false, message });
      }
    } catch (err) {
      res.status(500).send(err.message);
      console.error(err);
    }
  }

  async registerClient(req: Request, res: Response) {
    try {
      const { name, description, image, password } = req.body;
      const client = await Client.create({
        name,
        description,
        image,
        password,
      });
      res.json(client);
    } catch (err) {
      res.status(500).send(err.message);
      console.error(err);
    }
  }

  static fieldValidator() {
    const validators = [body('name').not().isEmpty().trim(), body('password').not().isEmpty().trim()];
    return validators;
  }
}

export default AuthController;
