import { FastifyInstance,FastifyPluginAsync } from "fastify";
import fastifyStatic from '@fastify/static';

const api: FastifyPluginAsync =  async (server: FastifyInstance) => {
    //public 폴더로 접근하게 해줌
    server.register(fastifyStatic, {
        root: process.cwd() + '/front/build',
        prefix: '/',
    });
}

export default api;
