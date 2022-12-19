const prisma = require('./../prisma/prisma')

prisma.$use(async (params, next)=>{
    if(params.model == 'Project' && params.action == 'delete')
    {
        params.action = 'update'
        params.args['data'] = { deleted: true }
    }
    // * console.info(params)
    return next(params)
})

const store = (data) =>{
    return prisma.project.create({data})
}

const findAll = ()=>{
    return prisma.project.findMany({
        where:{deleted:false},
        select: {
            id:true,
            name:true,
            description:true,
            deleted:true
        }
    })
}

const find = (id)=>{
    id = Number(id)
    return prisma.project.findFirst({
        where:{
            id,
            deleted:false,
        },
        select: {
            id:true,
            name:true,
            description:true,
            deleted:true
        },
    })
}

const edit = (id, data)=>{
    id = Number(id)
    return prisma.project.update({
        where:{
            id
        },
        data
    })
}

const destroy = (id)=>{
    id = Number(id)
    return prisma.project.delete({
        where:{id}
    })
}

const findProjectByName = (name)=>{
    return prisma.project.findUnique({
        where:{name}
    })
}

module.exports = {
    store,
    findAll, find,
    edit, destroy,
    findProjectByName,
}

// * https://www.prisma.io/docs/concepts/components/prisma-client/middleware
// * https://www.prisma.io/docs/concepts/components/prisma-client/crud
