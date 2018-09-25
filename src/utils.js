const jwt = require('jsonwebtoken')
const APP_SECRET = 'GraphQL-is-aw3some'

function getUserId(context) {
    const Authorization = context.request.get('Authorization')
    if (Authorization) {
        const token = Authorization.replace('Bearer ', '')
        try {
            const { userId } = jwt.verify(token, APP_SECRET)
            return userId
        } catch (e) {
            throw new Error('nao nao nao')
        }
    }

    throw new Error('Not authenticated')
}

module.exports = {
    APP_SECRET,
    getUserId,
}
