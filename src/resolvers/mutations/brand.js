import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import getBrandId from '../../utils/getBrandId'

const brand = {

  async createBrand(parent,args,{ prisma },info){
    const {name,email,username,password} = args.data

    const emailExists = await prisma.exists.Brand({ email })
    if(emailExists) throw new Error("Email already exists!")

    const usernameExists = await prisma.exists.Brand({ username })
    if(usernameExists) throw new Error("Username unabilable!")

    if(password.length <= 5) throw new Error("Password must have to minimum 6 characters!")

    const pwd = await bcrypt.hash(password,10)
    const brand = await prisma.mutation.createBrand({
      data: {name,email,username,password: pwd}
    })

    return {
      token: jwt.sign({ id:brand.id },'secret'),
      brand
    }
  },
  async loginBrand(parent,args,{ prisma },info){
    const brand = await prisma.query.brand({ where:{ username: args.username }})
    if(!brand) throw new Error("Unable to login!")
    const passwordMatch = await bcrypt.compare(args.password,brand.password);
    if(!passwordMatch) throw new Error("Unable to login!")

    return {
      token: jwt.sign({ id: brand.id },'secret'),
      brand
    }
  },
  async updateBrand(parent,args,{ prisma,req },info){
    const brandId = getBrandId(req)
    const brand = await prisma.query.brand({ where:{id:brandId} })
    if(!brand) throw new Error("Brand not found!")
    if(args.data.username && brand.username !== args.data.username){
      const usernameExists = await prisma.exists.Brand({ username:args.data.username })
      if(usernameExists) throw new Error("Username unabilable!")
    }
    if(args.data.email && brand.email !== args.data.email){
      const emailExists = await prisma.exists.Brand({ email:args.data.email })
      if(emailExists) throw new Error("Email taken!")
    }
    if(args.data.password){
      if(args.data.password.length <= 5) throw new Error("Password must have to minimum 6 characters!")
      args.data.password = await bcrypt.hash(args.data.password,10)
    }
    return prisma.mutation.updateBrand({
      data: args.data,
      where:{ id:brandId }
    })
  },
  async deleteBrand(parent,args,{ prisma,req },info){
    const brandId = getBrandId(req)
    const brandExists = await prisma.exists.Brand({ id:brandId })
    if(!brandExists) throw new Error("Brand not found!")
    return prisma.mutation.deleteBrand({
      where:{ id:brandId }
    },info)
  }

}

export default brand
