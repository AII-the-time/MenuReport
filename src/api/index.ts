import { FastifyInstance,FastifyPluginAsync } from "fastify";

const api: FastifyPluginAsync =  async (server: FastifyInstance) => {
    server.get('/ping', async (req, res) => {
        return {data:'pong'};
    });
}

export default api;
