import db from '../../db/models';
import { Response, Request } from 'express';
import { body } from 'express-validator';
const { Product, Product_Category, sequelize } = db;

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
      const { client_id, title, description, image, price, category_id } = req.body;
      const result = await sequelize.transaction(async (t) => {
        const product = await Product.create(
          {
            client_id,
            title,
            description,
            image,
            price,
          },
          { transaction: t }
        );
        await Product_Category.create(
          {
            CategoryMapId: category_id,
            ProductId: product.id,
          },
          { transaction: t }
        );
        return product;
      });

      res.json(result);
    } catch (err) {
      res.status(500).send(err.message);
      console.error(err);
    }
  }

  static fieldValidator() {
    const validators = [
      body('client_id').not().isEmpty().isNumeric(),
      body('category_id').not().isEmpty().isNumeric(),
      body('title').not().isEmpty().trim(),
      body('description').isString().trim().isLength({ min: 10 }),
      body('price').not().isEmpty().isNumeric(),
    ];
    return validators;
  }
}

export default ProductController;
