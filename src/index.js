import {GraphQLServer} from 'graphql-yoga'
import resolvers from './resolvers'
import { prisma } from './prisma'
import {fragmentReplacements} from './resolvers/index'

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context(req){
    return {
      prisma,
      req
    }
  },
  fragmentReplacements
})

server.start(() => {
  console.log('server start');
})
