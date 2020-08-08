import db from '../../db/models'
import {Response, Request} from 'express'
const {Product} = db

class ProductController {
    async getProducts(req: Request, resp: Response) {
        try {
            const products =  await Product.findAll()
            resp.json(products)
          } catch(err) {
            resp.status(500).send(err.message)
            console.error(err)
          }
    }

    async insertProduct(req: Request, resp: Response) {
        try {
            const product =  await Product.create({
                client_id: 1,
                title: 'Lykos',
                description: 'description',
                image: 'imagen',
                price: 2000
            })
            resp.json(product)
        } catch(err) {
            resp.status(500).send(err.message)
            console.error(err)
        }
    }
}

export default ProductController