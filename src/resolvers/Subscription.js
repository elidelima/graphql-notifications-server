
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


const newNotification = {
    subscribe: newNotificationSubscribe
}

module.exports = {
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