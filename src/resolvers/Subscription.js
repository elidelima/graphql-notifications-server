function newLinkSubscribe (parent, args, context, info) {
    return context.db.subscription.link(
        { where: { mutation_in: ['CREATED'] } },
        info,
    )
}

function newVoteSubscribe (parent, args, context, info) {
    return context.db.subscription.vote(
        { where: {mutation_in: ['CREATED']}},
        info
    )
}

/*
function newNotificationSubscribe (parent, args, context, info) {
     const listener = withFilter(
        () => context.pubsub.asyncIterator('newNotification'),
            (payload, variables) => {
            return payload.memberNumber === args.memberNumber;
            }
    )

    return listener;
}*/

function newNotificationSubscribe (parent, args, context, info) {
    return context.db.subscription.notification(
        { where: 
            {
                mutation_in: ['CREATED', 'UPDATED'],
                node: { memberNumber: args.memberNumber }
            }
        },
        info
    )
}

const newLink = {
    subscribe: newLinkSubscribe
}

const newVote = {
    subscribe: newVoteSubscribe
}

const newNotification = {
    subscribe: newNotificationSubscribe
}

module.exports = {
    newLink,
    newVote,
    newNotification,
    counter: {
        subscribe: (parent, args, { pubsub }) => {
            const channel = Math.random().toString(36).substring(2, 15) // random channel name
            let count = 0
            setInterval(() => pubsub.publish(channel, { counter: { count: count++ } }), 2000)
            return pubsub.asyncIterator(channel)
        },
    }
}