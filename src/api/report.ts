import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { prisma } from '../config/db';
import internal from "stream";

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

        //print prisma.goods.findFirst on mock menu

        let menuData: any = [];
        let mainMagin: any = 0;
        for (let i = 0; i < mock.menu.length; i++) {
            let recipeCost: any = 0;
            let pojangjaeCost: any = 0;
            let menuComponent: any = {
                name: mock.menu[i].menuName,
                price: mock.menu[i].menuPrice,
                magin: 0,
                profit: 0,
                pojangjae: [],
                recipe: [],
            };
            for (let j = 0; j < mock.menu[i].pojangjae.length; j++) {
                let pojangjaePrice: any = 0;
                for (let k = 0; k < mock.pojangjae.length; k++) {
                    if (mock.menu[i].pojangjae[j] == mock.pojangjae[k].name) {
                        pojangjaePrice = Math.round((+mock.pojangjae[k].price / +mock.pojangjae[k].count * 100) / 100);
                    }
                }
                menuComponent.pojangjae.push({
                    name: mock.menu[i].pojangjae[j],
                    price : pojangjaePrice,
                }
                );
                pojangjaeCost += pojangjaePrice;
            }
            if (mock.menu[i].wondu.name != "사용안함") {
                let wonduPrice: any = 0;
                for (let k = 0; k < mock.wondu.length; k++) {
                    if (mock.menu[i].wondu.name == mock.wondu[k].name) {
                        wonduPrice = Math.round((+mock.wondu[k].price / +mock.wondu[k].weight * 100) / 100);
                    }
                }
                let menuInfo: any = {
                    id: -1,
                    name: mock.menu[i].wondu.name,
                    weight: mock.menu[i].wondu.weight,
                    unitPerPrice: wonduPrice, //원두 가격 찾아서 넣어야 함.
                    price: Math.round((+mock.menu[i].wondu.weight * wonduPrice) * 100) / 100, //원두 가격 찾아서 넣어야 함.
                }
                recipeCost += menuInfo.price;
                menuComponent.recipe.push(menuInfo);
            }
            if (mock.menu[i].milk.name != "사용안함") {
                let milkPrice: any = 0;
                for (let k = 0; k < mock.milk.length; k++) {
                    if (mock.menu[i].milk.name == mock.milk[k].name) {
                        milkPrice = Math.round((+mock.milk[k].price / +mock.milk[k].weight * 100))/100;
                    }
                }
                
                let menuInfo: any = {
                    id: -1,
                    name: mock.menu[i].milk.name,
                    weight: mock.menu[i].milk.weight,
                    unitPerPrice: milkPrice, //우유 가격 찾아서 넣어야 함.
                    price: Math.round((+mock.menu[i].milk.weight * milkPrice) * 100) / 100, //우유 가격 찾아서 넣어야 함.
                }
                menuComponent.recipe.push(menuInfo);
                recipeCost += menuInfo.price; 
            }
            for (let j = 0; j < mock.menu[i].recipe.length; j++) {
                let tempMenuInfo:any = await prisma.goods.findFirst({
                    where: {
                        id: mock.menu[i].recipe[j].id,
                    },
                });
                let menuInfo: any = {
                    id: tempMenuInfo.id,
                    name: tempMenuInfo.name,
                    weight: mock.menu[i].recipe[j].weight,
                    unitPerPrice: tempMenuInfo.price / tempMenuInfo.volume,
                    price: Math.round((tempMenuInfo.price / tempMenuInfo.volume * +mock.menu[i].recipe[j].weight)*100)/100,
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
            allMaginAvg: Math.round((mainMagin / mock.menu.length)*100)/100,
            menu: { ...menuData },
        };

        return res.code(200).send(result);
    });
}

export default api;
