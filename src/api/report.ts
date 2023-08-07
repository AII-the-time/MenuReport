import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { prisma } from '../config/db';
import internal from "stream";

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

        //print prisma.goods.findFirst on mock menu

        let menuData: any = [];
        let mainMagin: any = 0;
        for (let i = 0; i < userData.menu.length; i++) {
            let recipeCost: any = 0;
            let pojangjaeCost: any = 0;
            let menuComponent: any = {
                name: userData.menu[i].menuName,
                price: userData.menu[i].menuPrice,
                magin: 0,
                profit: 0,
                pojangjae: [],
                recipe: [],
            };
            for (let j = 0; j < userData.menu[i].pojangjae.length; j++) {
                let pojangjaePrice: any = 0;
                for (let k = 0; k < userData.pojangjae.length; k++) {
                    if (userData.menu[i].pojangjae[j] == userData.pojangjae[k].name) {
                        pojangjaePrice = Math.round((+userData.pojangjae[k].price / +userData.pojangjae[k].count * 100) / 100);
                    }
                }
                menuComponent.pojangjae.push({
                    name: userData.menu[i].pojangjae[j],
                    price : pojangjaePrice,
                }
                );
                pojangjaeCost += pojangjaePrice;
            }
            if (userData.menu[i].wondu.name != "사용안함") {
                let wonduPrice: any = 0;
                for (let k = 0; k < userData.wondu.length; k++) {
                    if (userData.menu[i].wondu.name == userData.wondu[k].name) {
                        wonduPrice = Math.round((+userData.wondu[k].price / +userData.wondu[k].weight * 100) / 100);
                    }
                }
                let menuInfo: any = {
                    id: -1,
                    name: userData.menu[i].wondu.name,
                    weight: userData.menu[i].wondu.weight,
                    unitPerPrice: wonduPrice, //원두 가격 찾아서 넣어야 함.
                    price: Math.round((+userData.menu[i].wondu.weight * wonduPrice) * 100) / 100, //원두 가격 찾아서 넣어야 함.
                }
                recipeCost += menuInfo.price;
                menuComponent.recipe.push(menuInfo);
            }
            if (userData.menu[i].milk.name != "사용안함") {
                let milkPrice: any = 0;
                for (let k = 0; k < userData.milk.length; k++) {
                    if (userData.menu[i].milk.name == userData.milk[k].name) {
                        milkPrice = Math.round((+userData.milk[k].price / +userData.milk[k].weight * 100))/100;
                    }
                }
                
                let menuInfo: any = {
                    id: -1,
                    name: userData.menu[i].milk.name,
                    weight: userData.menu[i].milk.weight,
                    unitPerPrice: milkPrice, //우유 가격 찾아서 넣어야 함.
                    price: Math.round((+userData.menu[i].milk.weight * milkPrice) * 100) / 100, //우유 가격 찾아서 넣어야 함.
                }
                menuComponent.recipe.push(menuInfo);
                recipeCost += menuInfo.price; 
            }
            for (let j = 0; j < userData.menu[i].recipe.length; j++) {
                let tempMenuInfo:any = await prisma.goods.findFirst({
                    where: {
                        id: userData.menu[i].recipe[j].id,
                    },
                });
                let menuInfo: any = {
                    id: tempMenuInfo.id,
                    name: tempMenuInfo.name,
                    weight: userData.menu[i].recipe[j].weight,
                    unitPerPrice: tempMenuInfo.price / tempMenuInfo.volume,
                    price: Math.round((tempMenuInfo.price / tempMenuInfo.volume * +userData.menu[i].recipe[j].weight)*100)/100,
                }
                recipeCost += menuInfo.price;
                menuComponent.recipe.push(menuInfo);
            }
            
            menuComponent.magin = Math.round(((menuComponent.price - recipeCost - pojangjaeCost) / menuComponent.price * 100)*100)/100;
            menuComponent.profit = menuComponent.price - recipeCost - pojangjaeCost;
            mainMagin += menuComponent.magin;
            menuData.push(menuComponent);
        }
        console.log(menuData);
       
                
        // const price = await prisma.goods.findFirst({
        //     where: {
        //         id: mock.menu[0].recipe[0].id,
        //     },
        // });
        const result = {
            allMaginAvg: Math.round((mainMagin / userData.menu.length)*100)/100,
            menu: { ...menuData },
        };

        return res.code(200).send(result);
    });
}

export default api;
