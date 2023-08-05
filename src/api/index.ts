import { FastifyInstance,FastifyPluginAsync } from "fastify";
import user from './user';
import goods from './goods';

const api: FastifyPluginAsync =  async (server: FastifyInstance) => {
    server.get('/ping', async (req, res) => {
        return {data:'pong'};
    });
    server.register(user, { prefix: '/user' });
    server.register(goods, { prefix: '/goods' });
}

export default api;
