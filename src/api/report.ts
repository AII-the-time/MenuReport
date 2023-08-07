import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { prisma } from '../config/db';

const api: FastifyPluginAsync = async (server: FastifyInstance) => {
    server.get<
        {
            Querystring: {
                userId: string;
            },
            Reply: {
                200: object;
                404: undefined;
            }
        }
    >('/', async (req, res) => {
        const { userId } = req.query;
        const user = await prisma.user.findFirst({
            where: {
                uuid: userId,
            },
        });
        if (!user) {
            return res.code(404).send();
        }
        const userData:any = user.data;

        const [wonduWithUnitPrice,milkWithUnitPrice,pojangjaeWithUnitPrice] = [[userData.wondu,"weight","g"],[userData.milk,"weight","ml"],[userData.pojangjae,"count","개"]]
            .map(([item,type,unit]:any) => item.map((item2:any) => {
                const tempItem:any = {...item2};
                tempItem[`pricePer${type.replace(/^[a-z]/,(c:any)=>c.toUpperCase())}`] = Math.round((+item2.price / +item2[type] * 100))/100;
                tempItem.unit = unit;
                return tempItem;
            }));
        const menu: any = await Promise.all(userData.menu.map(async (menu: any) => {
            const pojangjae = menu.pojangjae.map((pojangjae: any) => {
                const pojangjaeInfo: any = pojangjaeWithUnitPrice.find((item: any) => item.name == pojangjae);
                return {
                    name: pojangjaeInfo.name,
                    price: pojangjaeInfo.pricePerCount
                }
            });

            const recipe = [
                ...[[wonduWithUnitPrice,menu.wondu],[milkWithUnitPrice,menu.milk]]
                    .map(([info,recipe]) => {
                        const infoOfThisMenu = info.find((item: any) => item.name == recipe.name);
                        if(infoOfThisMenu)
                            return {
                                id: -1,
                                name: recipe.name,
                                weight: recipe.weight,
                                price: Math.round((+recipe.weight * infoOfThisMenu.pricePerWeight)*100)/100,
                                unit: infoOfThisMenu.unit
                            }
                        return null;
                    })
                    .filter((item:any) => item),
                ...await Promise.all(menu.recipe.map(async (recipe: any) => {
                    if(!recipe.id) {
                        return {
                            id: -1,
                            name: recipe.name,
                            weight: recipe.volume,
                            price: 0,
                            unit: recipe.volume?recipe.unit: "개"
                        }
                    }
                    const recipeInfo: any = await prisma.goods.findFirst({
                        where: {
                            id: recipe.id,
                        },
                    });
                    return {
                        id: recipeInfo.id,
                        name: recipeInfo.name,
                        weight: recipe.volume,
                        price: Math.round(
                            (recipeInfo.price / (recipeInfo.volume?recipeInfo.volume * recipeInfo.count:recipeInfo.count))
                            * recipe.volume
                            *100)/100,
                        unit: recipeInfo.volume?recipeInfo.unit: "개"
                    }
                }))
            ];

            const cost = [pojangjae,recipe]
                .map(e=>e.reduce((acc: any, cur: any) => acc + cur.price, 0))
                .reduce((acc: any, cur: any) => acc + cur, 0);

            const name = menu.menuName;
            const price = menu.menuPrice;
            const profit = price - cost;
            const magin = Math.round((profit / price * 100)*100)/100;

            return { name, price, magin, profit, pojangjae, recipe };
        }));

        const result = {
            allMaginAvg: Math.round((menu.reduce((acc: any, cur: any) => {
                return acc + cur.magin;
            }, 0) / menu.length)*100)/100,
            menu: menu,
        };

        return res.code(200).send(result);
    });
}

export default api;
