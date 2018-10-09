const { GraphQLServer, PubSub } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const AuthPayload = require('./resolvers/AuthPayload')
const Subscription = require('./resolvers/Subscription')
const NotificationDetails=require('./resolvers/NotificationDetails')
const Notifications =  require('./resolvers/Notifications')
const NotificationResponse =  require('./resolvers/NotificationResponse')

const resolvers = {
    Query,
    Mutation,
    AuthPayload,
    Subscription,
    NotificationDetails,
    NotificationResponse,
    Notifications,
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
            endpoint: 'https://us1.prisma.sh/jonathasruiz1-7d2d8c/database/dev',
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
