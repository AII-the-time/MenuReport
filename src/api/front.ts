import { FastifyInstance,FastifyPluginAsync } from "fastify";
import fastifyStatic from '@fastify/static';
import { PrismaClient } from "@prisma/client";
import fs from 'fs';

const showFront = async (req:any, res:any):Promise<any> => {
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
}

const api: FastifyPluginAsync =  async (server: FastifyInstance) => {
    server.get('/*', async (req, res) => {
        const result = fs.readFileSync(process.cwd() + '/front/build' + req.url, 'utf8');
        return res.code(200).header('Content-Type', 'text/javascript; charset=utf-8').send(result);
    });

    ['/', '/index.html', '/PreInput', 'Input', '/Result'].forEach((path) => {
        server.get(path, showFront);
    });
}

export default api;
