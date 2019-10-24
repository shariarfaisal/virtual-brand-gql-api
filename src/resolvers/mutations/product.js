import getBrandId from '../../utils/getBrandId'

const product = {
  async createProduct(parent,args,{ prisma,req },info){
    const {title,description,subCategory,price,published} = args.data
    const brandId = getBrandId(req)

    const subCat = await prisma.query.subCategory({ where:{ id: subCategory } },'{ id name category { id name }}')
    if(!subCat) throw new Error("SubCategory not found!")

    return prisma.mutation.createProduct({
      data: {
        title,
        description,
        price,
        published,
        category:{
          connect:{
            id: subCat.category.id
          }
        },
        subCategory:{
          connect:{
            id: subCategory
          }
        },
        brand:{
          connect:{
            id: brandId
          }
        }
      }
    },info)

  },
  async updateProduct(parent,args,{ prisma,req },info){
    const brandId = getBrandId(req)
    const productExists = await prisma.exists.Product({ id: args.id,brand:{ id: brandId } })
    if(!productExists) throw new Error("Product not found!")

    return prisma.mutation.updateProduct({
      data: args.data,
      where:{
        id: args.id
      }
    },info)
  },
  async deleteProduct(parent,args,{ prisma,req },info){
    const brandId = getBrandId(req)
    const productExists = await prisma.exists.Product({ id: args.id,brand:{ id: brandId } })
    if(!productExists) throw new Error("Unable to delete!")

    return prisma.mutation.deleteProduct({
      where:{
        id: args.id
      }
    })
  }


}

export default product
