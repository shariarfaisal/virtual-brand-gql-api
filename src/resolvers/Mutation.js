import userMutation from './mutations/user'
import brandMutation from './mutations/brand'
import productMutation from './mutations/product'
import categoryMutation from './mutations/category'
import subCategoryMutation from './mutations/subCategory'

const Mutation = {
  ...userMutation,
  ...brandMutation,
  ...productMutation,
  ...categoryMutation,
  ...subCategoryMutation
}

export default Mutation
