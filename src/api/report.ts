import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const api: FastifyPluginAsync = async (server: FastifyInstance) => {
    server.get<
        {
            Reply: {
                200: object;
                404: undefined;
            }
        }
    >('/', async (req, res) => {
        const mock = {
            "wondu": [{ "name": "케냐", "weight": "1000", "price": "23000" }, { "name": "에티오피아", "weight": "1000", "price": "26000" }],
            "milk": [{ "name": "우유", "weight": "1000", "price": "2400"}],
            "pojangjae": [{ "name": "음료M", "count": "2000", "price": "30000" }, { "name": "음료L", "count": "2000", "price": "33000" }, { "name": "빨대", "count": "1000", "price": "20000" }],
            "menu": [
                {
                    menuName: '카페라떼',
                    menuPrice: '4500',
                    wondu: { name: '케냐', weight: '45' },
                    milk: { name: '우유', weight: '210' },
                    pojangjae: ["음료M", "빨대"],
                    recipe: [],
                },
                {
                    menuName: '초코라떼',
                    menuPrice: '4500',
                    wondu: { name: '사용안함', weight: '0' },
                    milk: { name: '우유', weight: '210' },
                    pojangjae: ["음료M", "빨대"],
                    recipe: [{ id: 5132, weight: '50' }, { id: 743, weight: '50' }],
                },
            ]
        };
        const price = await prisma.goods.findFirst({
            where: {
                id: 5132,
            },
        });

        // const allMaginAvg = mock.menu.map((menu) => {
        //     const wonduPrice = menu.wondu.weight * mock.wondu.find((wondu) => wondu.name === menu.wondu.name)?.price;
        //     const milkPrice = menu.milk.weight * mock.milk.find((milk) => milk.name === menu.milk.name)?.price;
        //     const pojangjaePrice = menu.pojangjae.reduce((acc, cur) => {
        //         const price = mock.pojangjae.find((pojangjae) => pojangjae.name === cur)?.price;
        //         return acc + price;
        //     }, 0);
        //     const recipePrice = menu.recipe.reduce((acc, cur) => {
        //         const price = mock.wondu.find((wondu) => wondu.name === cur.id)?.price;
        //         return acc + price;
        //     }, 0);
        //     const menuPrice = menu.menuPrice;
        //     const magin = menuPrice - (wonduPrice + milkPrice + pojangjaePrice + recipePrice);
        //     return magin / menuPrice;
        // }).reduce((acc, cur) => acc + cur, 0) / mock.menu.length;


        const result = {
            allMaginAvg: "66.7",
            //"allProfitexpect": 300000* allMaginAvg,
            "menu": [
                {
                    "name": "카페라떼",
                    "price": "4500",
                    "magin": "57.1",
                    "profit": "1930",
                    "pojangjae": [
                        {
                            "name": "음료M",
                            "perPrice": "15",
                        },
                        {
                            "name": "빨대",
                            "perPrice": "10",
                        }
                    ],
                    "recipe": [
                        {
                            "name": "케냐",
                            "weight": "45",
                            "unitPerPrice": "23",
                            "price": "1035"
                        },{
                            "name": "우유",
                            "weight": "210",
                            "unitPerPrice": "2.4",
                            "price": "504"
                        }
                    ]
                }
            ]
        };

        return res.code(200).send(result);
    });
}

export default api;
