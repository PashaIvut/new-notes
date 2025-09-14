import { createYoga, createSchema } from 'graphql-yoga'
import { createServer } from 'http'
import { config } from './config'
import { typeDefs } from './schema/typeDefs.generated'
import { resolvers } from './schema/resolvers.generated'
 
const yoga = createYoga({ schema: createSchema({ typeDefs, resolvers }) })
const server = createServer(yoga)
server.listen(config.port, () => {
    console.log(`GraphQL сервер запущен на http://localhost:${config.port}/graphql`)
})