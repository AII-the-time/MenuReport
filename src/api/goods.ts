import { FastifyInstance,FastifyPluginAsync } from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const api: FastifyPluginAsync =  async (server: FastifyInstance) => {
    server.get<
    {
        Params: {
            category: string;
        },
        Reply: {
            200: object;
            404: undefined;
        }
    }
    >('/:category', async (req, res) => {
        const { category } = req.params;
        const goods = await prisma.goods.findMany({
            where: {
                category: category
            },
        });
        if (!goods) {
            return res.code(404).send();
        }
        return res.code(200).send(goods);
    });

    server.get<
    {
        Params: {
            category: string;
            category2: string;
        },
        Reply: {
            200: object;
            404: undefined;
        }
    }
    >('/:category/:category2', async (req, res) => {
        const { category, category2 } = req.params;
        const goods = await prisma.goods.findMany({
            where: {
                category: category.concat('/'+category2),
            },
        });
        if (!goods) {
            return res.code(404).send();
        }
        return res.code(200).send(goods);
    });

    server.get<
    {
        Querystring: {
            keywords: string;
        },
        Reply: {
            200: object;
            404: undefined;
        }
    }
    >('/search', async (req, res) => {
        const { keywords } = req.query;
        const splitKeywords = keywords.trim().split(' ');
        const query = `SELECT * FROM goods
        where name regexp "(${splitKeywords.join('|')}){${splitKeywords.length}}"
        or (name regexp "(${splitKeywords.join('|')}){${splitKeywords.length-1}}" and brand regexp "(${splitKeywords.join('|')})")`;
        const goods = await prisma.$queryRawUnsafe(query);
        if (!goods) {
            return res.code(404).send();
        }
        return res.code(200).send(goods);
    });
}

export default api;
