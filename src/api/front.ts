import { FastifyInstance,FastifyPluginAsync } from "fastify";
import fastifyStatic from '@fastify/static';
import { PrismaClient } from "@prisma/client";
import fs from 'fs';

const api: FastifyPluginAsync =  async (server: FastifyInstance) => {
    server.register(fastifyStatic, {
        root: process.cwd() + '/front/build',
        prefix: '/',
    });

    ['/', '/index.html', '/PreInput', 'Input', '/Result'].forEach((path) => {
        server.get<{
            Querystring: {
                userId: string;
            }
        }>(path, async (req, res) => {
            const { userId } = req.query;
            if (!userId) {
                return res.code(400).send();
            }
            const prisma = new PrismaClient();
            const user = await prisma.user.findUnique({
                where: {
                    uuid: userId,
                },
            });
            console.log(user);
            if (!user) {
                return res.code(404).send();
            }
            const result = fs.readFileSync(process.cwd() + '/front/build/index.html', 'utf8');
            return res.code(200).header('Content-Type', 'text/html; charset=utf-8').send(result);
        });
    });
}

export default api;
