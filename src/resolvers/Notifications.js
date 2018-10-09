const { getMemberNumber } = require('../utils')

async function notifications(parent, args, context, info){
    let where={}
    const memberNumber = getMemberNumber(context)

    if(!memberNumber){
        throw Error("Missing member number in Header")
    }

    switch(parent.situation){
        case "NEW":
        where={
            situation: 'NEW',
            memberNumber
        }
        break;

        case "HISTORY":
        where={
            situation: 'HISTORY',
            memberNumber
        }
        break;
    }

    const notifications=await context.db.query.notifications({where},info)
    return notifications
}

const nextToken = () => "lakjsdkfljlkajsdf"

module.exports={
    notifications,
    nextToken
}