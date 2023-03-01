import { FastifyInstance, FastifyReply, FastifyRequest, FastifyServerOptions } from 'fastify'
import { orders } from '../data/orders.json';

interface IQueryString {
    name: string;
    id: number;
    customerId: number
}

interface IParams {
    name: string;
    id: number;
    customerId: number;
}

interface CustomRouteGenericParam {
    Params: IParams
}

interface CustomRouteGenericQuery {
    Querystring: IQueryString
}

export default async function (instance: FastifyInstance, opts: FastifyServerOptions, done) {


    instance.get('/', async (req: FastifyRequest, res: FastifyReply) => {
        res.status(200).send({
            hello: 'World'
        })
    })

    instance.register(async (instance: FastifyInstance, opts: FastifyServerOptions, done) => {

        instance.get('/', async (req: FastifyRequest<CustomRouteGenericQuery>, res: FastifyReply) => {
            const { name = '' } = req.query
            res.status(200).send(`Hello ${name}`)
        })

        instance.get('/:name', async (req: FastifyRequest<CustomRouteGenericParam>, res: FastifyReply) => {
            const { name = '' } = req.params
            res.status(200).send(`Hello ${name}`)
        })
        done()
    }, {
        prefix: '/hello'
    })

    instance.register(async (instance: FastifyInstance, opts: FastifyServerOptions, done) => {

        instance.get('/', async (req: FastifyRequest<CustomRouteGenericQuery>, res: FastifyReply) => {
            res.status(200).send({orders})
        })

        instance.get('/:id', async (req: FastifyRequest<CustomRouteGenericParam>, res: FastifyReply) => {
            const { id = 0 } = req.params
            const order = orders.find(o => o.id == id);

            res.status(200).send({order})
        })

        instance.get('/customer/:customerId', async (req: FastifyRequest<CustomRouteGenericParam>, res: FastifyReply) => {
            const { customerId = 0 } = req.params
            const customerOrders = orders.filter((x) => x.customerId == customerId)
            res.status(200).send({customerOrders})
        })

        done()
    }, {
        prefix: '/orders'
    })

    done()
}