import getBrandId from '../utils/getBrandId'
import getUserId from '../utils/getUserId'

const Query = {
  users(parent,args,{ prisma },info){
    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy
    }
    if(args.query){
      opArgs.where = {
        name_contains: args.query
      }
    }
    return prisma.query.users(opArgs,info)
  },
  user(parent,args,{ prisma,req },info){
    const userId = getUserId(req)
    return prisma.query.user({ where:{ id:userId }},info)
  },
  brands(parent,args,{ prisma },info){
    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy
    }
    if(args.query){
      opArgs.where.OR =[
        {name_contains: args.query },
        {username_contains: args.query}
      ]
    }
    return prisma.query.brands(opArgs,info)
  },
  products(parent,args,{prisma,req},info){
    const brandId = getBrandId(req,false)
    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy,
      where:{
        published: true
      }
    }
    if(args.query){
      opArgs.where.OR =[
        {title_contains: args.query },
        {description_contains: args.query}
      ]
    }

    return prisma.query.products(opArgs,info)
  },
  categories(parent,args,{ prisma },info){
    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy
    }
    if(args.query){
      opArgs.where = {
        name_contains: args.query
      }
    }
    return prisma.query.categories(opArgs,info)
  }
}

export default Query
