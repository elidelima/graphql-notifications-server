async function notifications(parent, args, context, info){
    let where={}
    switch(parent.situation){
        case "NEW":
        where={
            situation: 'NEW'
        }
        break;

        case "HISTORY":
        where={
            situation: 'HISTORY' 
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