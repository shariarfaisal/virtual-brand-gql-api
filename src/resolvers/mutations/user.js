import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import getUserId from '../../utils/getUserId'

const userMutation = {
  async createUser(parent,args,{ prisma },info){
    const {name,email,address,city,country,password} = args.data

    const emailExists = await prisma.exists.User({ email })
    if(emailExists) throw new Error("Email already exists!")
    if(password.length <= 5) throw new Error("Password must have to minimum 6 characters!")

    const pwd = await bcrypt.hash(password,10)
    const user = await prisma.mutation.createUser({
      data: {name,email,address,city,country,password:pwd}
    })

    return {
      token: jwt.sign({id: user.id},'secret'),
      user
    }
  },
  async login(parent,args,{prisma},info){
    const user = await prisma.query.user({ where:{ email: args.email }})
    if(!user) throw new Error("Unable to login!")
    const passwordMatch = await bcrypt.compare(args.password,user.password);
    if(!passwordMatch) throw new Error("Unable to login!")

    return{
      token: jwt.sign({id: user.id},'secret'),
      user
    }
  },
  async updateUser(parent,args,{prisma,req},info){
    const userId = getUserId(req)
    const user = await prisma.query.user({ where:{id:userId} })
    if(!user) throw new Error("User not found")
    if(args.data.email && user.email !== args.data.email){
      const emailExists = await prisma.exists.User({ email:args.data.email })
      if(emailExists) throw new Error("Email taken!")
    }
    if(args.data.password){
      if(args.data.password.length <= 5) throw new Error("Password must have to minimum 6 characters!")
      args.data.password = await bcrypt.hash(args.data.password,10)
    }
    return prisma.mutation.updateUser({
      data: args.data,
      where:{ id:userId }
    },info)
  },
  async deleteUser(parent,args,{prisma,req},info){
    const userId = getUserId(req)
    const userExists = await prisma.exists.User({ id:userId })
    if(!userExists) throw new Error("User not found")
    return prisma.mutation.deleteUser({
      where:{ id:userId }
    },info)
  }
}

export default userMutation
