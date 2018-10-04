const { GraphQLServer, PubSub } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const AuthPayload = require('./resolvers/AuthPayload')
const Subscription = require('./resolvers/Subscription')
const Feed = require('./resolvers/Feed')
//const { PubSub, withFilter } = require('graphql-subscriptions')

/*
let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]
*/

//let idCount = links.length

const resolvers = {
    Query,
    Mutation,
    AuthPayload,
    Subscription,
    Feed,
    Counter: {
        countStr: counter => `Current count: ${counter.count}`,
    },
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    resolverValidationOptions :{
        requireResolversForResolveType: false
    },
    context: req => ({
        ...req,
        db: new Prisma({
            typeDefs: 'src/generated/prisma.graphql',
            endpoint: 'https://eu1.prisma.sh/eli-lima/database/dev',
            secret: 'mysecret123',
            debug: true,
        }),
        pubsub: new PubSub(),
        //withFilter: withFilter
    }),
})

const options = {
    port: 4000,
    endpoint: '/graphql',
    subscriptions: '/subscriptions',
    playground: '/playground',
}

server.start(options, ({ port }) =>
    console.log(
        `Server started, listening on port ${port} for incoming requests.`,
    ),
)

//server.start(() => console.log(`Server is running on http://localhost:4000`))
