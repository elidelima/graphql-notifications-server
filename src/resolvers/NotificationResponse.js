function notificationsNew(parent, args, context, info){ 
    return ({situation: 'NEW' }) 
}
function notificationsHistory(parent, args, context, info){
    return ({situation: 'HISTORY' })
}




module.exports={
    notificationsNew,
    notificationsHistory
}
