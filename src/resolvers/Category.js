const Category = {
  products(parent,args,{ prisma,req },info){
    return prisma.query.products({
      where:{
        category:{
          id: parent.id
        },
        published: true
      }
    },info)
  }
}

export default Category
