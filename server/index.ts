import {PrismaClient, ArticleTabName} from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

    // ... you will write your Prisma Client queries here
    // const createUser = await prisma.user.create({
    //     data:{
    //         email: "14@qq.com",
    //         name: "yuyu",
    //         info: {
    //             create: {}
    //         }
    //     },
    //     include:{
    //         info:true
    //     }
    // })
    // console.log(createUser)

    // const createArticle = await prisma.article.prisma.create({
    //     data:{
    //         title: "我是新的标题",
    //         body: "<p>sdfdsf</p>",
    //         cover: "路径",
    //         authorId: 1,
    //         tabs:{
    //
    //         }
    //     }
    // })
    // console.log(createArticle)

    // const allUsers = await prisma.user.findMany({
    //     // include:{
    //     //     info:true
    //     // }
    // })
    // console.dir(allUsers, {depth: null})
    //
    // const initTab = await prisma.articleTab.create({
    //     data:{
    //         name: ArticleTabName.Not
    //     }
    // })
}

main()
    .catch((e) => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })