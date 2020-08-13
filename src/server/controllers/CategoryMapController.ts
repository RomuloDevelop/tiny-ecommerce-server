import db from '../../db/models';
import { Response, Request } from 'express';
import { body } from 'express-validator';
import { Model } from 'sequelize';
const { CategoryMap, Product } = db;

class ProductByCategory extends CategoryMap {
  Products!: typeof Product[];
}
class CategoryMapController {
  async getCategories(req: Request, res: Response) {
    try {
      const categories = await CategoryMap.findAll();
      res.json(categories);
    } catch (err) {
      res.status(500).send(err.message);
      console.error(err);
    }
  }

  async getCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const category = await CategoryMap.findByPk(id);
      res.json(category);
    } catch (err) {
      res.status(500).send(err.message);
      console.error(err);
    }
  }
  async getProducts(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const category = await ProductByCategory.findAll({
        where: {
          id,
        },
        include: {
          model: Product as typeof Model,
          through: {
            attributes: [],
          },
          required: true,
        },
      });
      res.json(category[0].Products);
    } catch (err) {
      res.status(500).send(err.message);
      console.error(err);
    }
  }

  async insertCategory(req: Request, res: Response) {
    try {
      const { name, parent_id, client_id } = req.body;
      const category = (await CategoryMap.createNode(parent_id, client_id, name))[0];
      if (category.id == null) {
        res.status(400).json({
          message: 'No client or node parent where found',
        });
      } else {
        res.json(category);
      }
    } catch (err) {
      res.status(500).send(err.message);
      console.error(err);
    }
  }

  async deleteCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const category = await CategoryMap.destroy({
        where: { id },
      });
      res.json(category);
    } catch (err) {
      res.status(500).send(err.message);
      console.error(err);
    }
  }

  static fieldValidator() {
    const validators = [
      body('client_id').not().isEmpty().trim(),
      body('name').not().isEmpty().isString().trim(),
      body('parent_id')
        .isNumeric()
        .custom((value) => {
          if (value <= 0) {
            throw new Error('parent_id must be a greater than 0');
          }
          return true;
        }),
    ];
    return validators;
  }
}

export default CategoryMapController;
