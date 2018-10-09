function notificationDetails(parent, args, context, info){
    return context.db.query.notificationDetails({}, info)
}

module.exports={
    notificationDetails
}