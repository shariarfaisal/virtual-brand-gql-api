import getUserId from '../utils/getUserId'

const User = {
  email(parent,args,{ prisma,req },info){
    const userId = getUserId(req,false)
    if(userId != parent.id){
      return null
    }else{
      return parent.email
    }
  }
}

export default User
