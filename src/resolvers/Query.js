/*function feed(root, args, context, info) {
    let response = context.db.query.links({}, info);
    response.then(data => {
        data[0].url = "Brubles 1"
    })
    return response;
}*/

const { getUserId } = require('../utils')

async function feed(parent, args, context, info) {
    
    //const userId = getUserId(context)
    
    const where = args.filter 
        ? { 
            OR : [
                { url_contains: args.fiter },
                { description_contains: args.filter }
            ],
        } : {}
    
    const queriedLinks = await context.db.query.links(
        { where, skip: args.skip, first: args.first, orderBy: args.orderBy },
        `{ id }`,
    )

    const countSelectionSet = `{ aggregate { count } }`

    const linksConnection = await context.db.query.linksConnection({ where, skip: args.skip, first: args.first }, countSelectionSet)

    return {
        count: linksConnection.aggregate.count,
        linkIds: queriedLinks.map(link => link.id),
    }
}

function notifications(parent, args, context, info){

    const where = 
        {
            memberNumber: args.memberNumber,
            status: args.status,
        }
    return context.db.query.notifications({ where }, info);
}

function allNotifications(parent, args, context, info){
    return context.db.query.notifications({}, info);
}

module.exports = {
    feed,
    notifications,
    allNotifications,
}