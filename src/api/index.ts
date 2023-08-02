import { FastifyInstance,FastifyPluginAsync } from "fastify";
import { PrismaClient } from "@prisma/client";

const api: FastifyPluginAsync =  async (server: FastifyInstance) => {
    server.get('/ping', async (req, res) => {
        return {data:'pong'};
    });

    server.post<
    {
        Body: {
            userId: string;
            data: object;
        }
    }
    >('/save', async (req, res) => {
        const { userId, data } = req.body;
        const prisma = new PrismaClient();
        await prisma.user.update({
            where: {
                uuid: userId,
            },
            data: {
                data: JSON.stringify(data),
            },
        });
        return res.code(200).send();
    });
}

export default api;
