import jwt from 'jsonwebtoken'


const getBrandId = (req,required=true) => {
  const header = req.request ? req.request.headers.brand : req.connection.context.Brand

  if(header){
    try{
      const token = header.replace('Bearer ','')
      const decoded = jwt.verify(token,'secret')
      return decoded.id
    }catch(err){
      throw new Error("Authentication failed!")
    }
  }

  if(required){
    throw new Error("Authentication required!")
  }

  return null
}

export default getBrandId
