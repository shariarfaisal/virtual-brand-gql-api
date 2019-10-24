
const category = {
  async createCategory(parent,{data:{ name }},{ prisma },info){
    const cats = await prisma.query.categories({
      where:{ name }
    })
    if(cats.length !== 0) throw new Error("Category already exists!")
    return prisma.mutation.createCategory({
      data: { name }
    },info)
  },
  async updateCategory(parent,{id,data},{ prisma },info){
    const catExists = await prisma.exists.Category({ id })
    if(!catExists) throw new Error("Category not found!")
    return prisma.mutation.updateCategory({
      data,
      where:{ id }
    },info)
  },
  async deleteCategory(parent,{id},{ prisma },info){
    const catExists = await prisma.exists.Category({ id })
    if(!catExists) throw new Error("Category not found!")

    return prisma.mutation.deleteCategory({ where:{ id }},info)
  }
}

export default category
