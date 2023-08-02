import { FastifyInstance } from 'fastify';
import { initEnvFromDotEnv } from '../config';
import api from '../api';
import front from '../api/front';

export default async (server: FastifyInstance): Promise<void> => {
    initEnvFromDotEnv();
    server.register(api, { prefix: '/api' });
    server.register(front, { prefix: '/' });
}
