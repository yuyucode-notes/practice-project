async function user(){
    const createUser = await prisma.user.create({
        data:{
            email: "14@qq.com",
            name: "yuyu",
            info: {
                create: {}
            }
        },
        include:{
            info:true
        }
    })
}
