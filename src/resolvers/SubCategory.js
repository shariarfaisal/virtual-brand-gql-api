const subCategory = {
  products(parent,args,{ prisma,req },info){
    return prisma.query.products({
      where:{
        subCategory:{
          id: parent.id
        },
        published: true
      }
    },info)
  }
}

export default subCategory
