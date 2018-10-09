const { getUserId } = require('../utils')

async function notifications(parent, args, context, info){
    const where={
        situation:'NEW'
    }
    const countSelectionSet=`{
        aggregate{
            count
        }
    }`

    const notificationsConnection= await context.db.query.notificationsConnection({where},countSelectionSet)

    return {
            hasMoreNewNotification: false,
            newNotificationCount: notificationsConnection.aggregate.count
    }

    //const member="40802112"

    // const where_1 = 
    //     {
    //         memberNumber: member, //grab from header
    //         situation: `NEW`, 
    //     }

    // const where_2 = 
    //     {
    //         memberNumber: member, //grab from header
    //         situation: `HISTORY`, 
    //     }

    // const notificationsNew= await context.db.query.notifications({ where:where_1, skip:args.limitNew }, info);
    // const notificationsHistory= await context.db.query.notifications({ where:where_2, skip: args.limitHistory }, info);

    // return {
    //     notificationsNew,
    //     notificationsHistory
    // }
}

function allNotifications(parent, args, context, info){
    return context.db.query.notifications({}, info);
}


 async function allNotificationsDetails(parent, args, context, info){
     
    return {
        nextToken:"akshjfkujashdkfjhasdf"
    }
}

module.exports = {
    notifications,
    allNotifications,
    allNotificationsDetails
}