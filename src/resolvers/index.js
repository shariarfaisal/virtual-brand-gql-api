import {extractFragmentReplacements} from 'prisma-binding'
import Query from './Query'
import Mutation from './Mutation'
import User from './User'
import Product from './Product'
import Brand from './Brand'
import Category from './Category'
import SubCategory from './SubCategory'
import Subscription from './Subscription'


const resolvers = {
  Query,
  Mutation,
  User,
  Product,
  Brand,
  Category,
  SubCategory,
  Subscription
}

export const fragmentReplacements = extractFragmentReplacements(resolvers)

export default resolvers
