const Subscription = {
  user:{
    subscribe(parent,args,{ prisma },info){
      return prisma.subscription.user(null,info)
    }
  },
  brand:{
    subscribe(parent,args,{ prisma },info){
      return prisma.subscription.brand(null,info)
    }
  },
  product:{
    subscribe(parent,args,{ prisma },info){
      return prisma.subscription.product(null,info)
    }
  },
  category:{
    subscribe(parent,args,{ prisma },info){
      return prisma.subscription.category(null,info)
    }
  },
  subCategory:{
    subscribe(parent,args,{ prisma },info){
      return prisma.subscription.subCategory(null,info)
    }
  }
}

export default Subscription
