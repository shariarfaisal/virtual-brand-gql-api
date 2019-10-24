const subCategory = {
  async createSubCategory(parent,{data},{ prisma },info){
    const catExists = await prisma.exists.Category({ id: data.category })
    if(!catExists) throw new Error("Category not found!")

    const cat = await prisma.query.subCategories({ where:{ name:data.name }})
    if(cat.length !== 0) throw new Error(`${data.name} already exists!`)

    return prisma.mutation.createSubCategory({
      data:{
        name: data.name,
        category:{
          connect:{
            id: data.category
          }
        }
      }
    },info)

  },
  async updateSubCategory(parent,{id,data},{ prisma },info){
    const exists = await prisma.exists.SubCategory({ id })
    if(!exists) throw new Error("SubCategory not found!")

    const cat = await prisma.query.subCategories({ where:{ name:data.name }})
    if(cat.length !== 0) throw new Error(`${name} already exists!`)

    return prisma.mutation.updateSubCategory({
      data,
      where:{ id }
    })
  },
  async deleteSubCategory(parent,{ id },{ prisma },info){
    const exists = await prisma.exists.SubCategory({ id })
    if(!exists) throw new Error("SubCategory not found!")

    return prisma.mutation.deleteSubCategory({where:{ id }},info)
  }
}

export default subCategory
