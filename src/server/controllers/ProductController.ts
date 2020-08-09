import db from '../../db/models';
import { Response, Request } from 'express';
import { body } from 'express-validator';
const { Product } = db;

class ProductController {
  async getProducts(req: Request, res: Response) {
    try {
      const products = await Product.findAll();
      res.json(products);
    } catch (err) {
      res.status(500).send(err.message);
      console.error(err);
    }
  }

  async getProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);
      res.json(product);
    } catch (err) {
      res.status(500).send(err.message);
      console.error(err);
    }
  }

  async insertProduct(req: Request, res: Response) {
    try {
      const { client_id, title, description, image, price } = req.body;
      const product = await Product.create({
        client_id,
        title,
        description,
        image,
        price,
      });
      res.json(product);
    } catch (err) {
      res.status(500).send(err.message);
      console.error(err);
    }
  }

  static fieldValidator() {
    const validators = [
      body('client_id').not().isEmpty().trim(),
      body('title').not().isEmpty().isNumeric(),
      body('description').isString().trim().isLength({ min: 10 }),
      body('price').not().isEmpty().isNumeric(),
    ];
    return validators;
  }
}

export default ProductController;
