import { FastifyInstance,FastifyPluginAsync } from "fastify";
import { PrismaClient } from "@prisma/client";

const api: FastifyPluginAsync =  async (server: FastifyInstance) => {
    server.get<
    {
        Params: {
            userId: string;
        },
        Reply: {
            200: object;
            404: undefined;
        }
    }
    >('/load/:userId', async (req, res) => {
        const { userId } = req.params;
        const prisma = new PrismaClient();
        const user = await prisma.user.findUnique({
            where: {
                uuid: userId,
            },
        });
        if (!user) {
            return res.code(404).send();
        }
        return res.code(200).send(user.data);
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
