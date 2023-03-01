import { FastifyInstance, FastifyReply, FastifyRequest, FastifyServerOptions } from 'fastify'
import { orders } from '../data/orders.json';

interface IQueryString {
    name: string;
}

interface IParams {
    name: string;
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
            res.status(200).send(orders)
        })

        instance.get('/:customerId', async (req: FastifyRequest<CustomRouteGenericParam>, res: FastifyReply) => {
            const { customerId = '' } = req.params
            let obj = orders.find(o => o.customerId == customerId);

            res.status(200).send(obj)
        })
        done()
    }, {
        prefix: '/orders'
    })

    done()
}