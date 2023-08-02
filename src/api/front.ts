import { FastifyInstance,FastifyPluginAsync } from "fastify";
import fastifyStatic from '@fastify/static';

const api: FastifyPluginAsync =  async (server: FastifyInstance) => {
    //public 폴더로 접근하게 해줌
    server.register(fastifyStatic, {
        root: process.cwd() + '/src/public',
        prefix: '/',
    });
}

export default api;
