import IRouter from './IRouter'
import express = require('express')
import db from '../../db/models'

const {Client} = db

class CategoryRoute implements IRouter {
    private router: express.Router
    constructor() {
        this.router = express.Router()
    }
    getRoutes() {
        return this.router
    }

    setRoutes() {
        this.router.get('/', async (req, resp) => {
            const clients =  await Client.findAll()
            resp.json(clients)
        })
        .post('/', async (req, resp) => {
            const client =  await Client.create({
                name: 'Lykos',
                description: 'description',
                image: 'imagen'
            })
        })
        return this.router
    }    
}

export default CategoryRoute
