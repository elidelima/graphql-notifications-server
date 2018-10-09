const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

async function signup(parent, args, context, info) {
    // 1
    const password = await bcrypt.hash(args.password, 10)
    // 2
    const user = await context.db.mutation.createUser({
        data: { ...args, password },
    }, `{ id }`)

    // 3
    const token = jwt.sign({ userId: user.id }, APP_SECRET)

    // 4
    return {
        token,
        user,
    }
}

async function login(parent, args, context, info) {
    // 1
    const user = await context.db.query.user({ where: { email: args.email } }, ` { id password } `)
    if (!user) {
        throw new Error('No such user found')
    }

    // 2
    const valid = await bcrypt.compare(args.password, user.password)
    if (!valid) {
        throw new Error('Invalid password')
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET)

    // 3
    return {
        token,
        user,
    }
}


async function createNotification(parent, args, context, info) {

    const newNotification = await context.db.mutation.createNotification(
        {
            data: { 
                memberNumber: args.memberNumber,
                situation: args.status,
                createdOn: new Date(),
                detail: { connect: { code: args.code } },
                timeToLive: new Date(),
                lastUpdated: new Date()
            },
        },
        info,
    )

    //context.pubsub.publish('newNotification', { newNotification: newNotification,
    //    memberNumber: args.memberNumber});
    console.log("Shoud publish newNotification: ");
    console.log({newNotification});
    context.pubsub.publish('new_notification', { newNotification: newNotification});
    

    return newNotification;
}

async function createNotificationDetail(parent, args, context, info) {
    return await context.db.mutation.createNotificationDetail(
        {
            data: {
                code: args.code,
                action: args.action,
                description: args.description,
                priority: args.priority,
                lastUpdated: new Date()
            },
        },
        info,
    )
}

async function deleteAllNotifications(parent, args, context, info) {
    const where = { memberNumber: args.memberNumber }
    const response = await context.db.mutation.deleteManyNotifications({where});
    return `${response.count} registers deleted.`;
}

async function moveNotificationToHistory(parent, args, context, info) {
    console.log({args});
}



module.exports = {
    signup,
    login,
    createNotificationDetail,
    createNotification,
    moveNotificationToHistory,
    deleteAllNotifications,
}