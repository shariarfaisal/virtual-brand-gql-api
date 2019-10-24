import getBrandId from '../utils/getBrandId'

const Brand = {
  products:{
    fragment: 'fragment brandId on Brand { id }',
    resolve(parent,args,{ prisma,req },info){
      const brandId = getBrandId(req,false)
      return prisma.query.products({
        where:{
          brand:{
            id: parent.id
          },
          OR:[
            {brand:{id: brandId}},
            {published: true}
          ]
        }
      },info)
    }
  },
  username:{
    fragment: 'fragment brandId on Brand { id }',
    resolve(parent,args,{ prisma,req },info){
      const brandId = getBrandId(req,false)
      if(brandId != parent.id){
        return null
      }else{
        return parent.username
      }
    }
  },
  email:{
    fragment:'fragment brandId on Brand { id }',
    resolve(parent,args,{ prisma,req },info){
      const brandId = getBrandId(req,false)
      if(brandId != parent.id){
        return null
      }else{
        return parent.email
      }
    }
  }
}

export default Brand
