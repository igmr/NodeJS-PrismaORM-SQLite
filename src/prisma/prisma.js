const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient({
    errorFormat: 'pretty',
    log: ['query', 'info', 'warn', 'error'],
})

module.exports = prisma

// * https://www.prisma.io/docs/reference/api-reference/prisma-client-reference
