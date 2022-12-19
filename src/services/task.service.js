const prisma = require('./../prisma/prisma')

const store = (data) =>{
    return prisma.task.create({data})
}

const findAll = ()=>{
    return prisma.task.findMany()
}

const find = (id)=>{
    id = Number(id)
    return prisma.task.findFirst({
        where:{id}
    })
}

const edit = (id, data)=>{
    id = Number(id)
    return prisma.task.update({
        where:{id},
        data
    })
}

const destroy = (id)=>{
    id = Number(id)
    return prisma.task.delete({
        where:{id}
    })
}

module.exports = {
    store,
    findAll, find,
    edit, destroy
}

// * https://www.prisma.io/docs/concepts/components/prisma-client/crud
