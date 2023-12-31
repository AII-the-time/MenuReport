import { FastifyInstance,FastifyPluginAsync } from "fastify";
import { prisma } from '../config/db';

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
        const user:any = await prisma.user.findUnique({
            where: {
                uuid: userId,
            },
        });
        if (!user) {
            return res.code(404).send();
        }
        return res.code(200).send(JSON.parse(user.data));
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
        console.log(data);
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
