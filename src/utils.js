const jwt = require('jsonwebtoken')
const APP_SECRET = 'GraphQL-is-aw3some'

function getMemberNumber(context) {
    const MemberNumber = context.request.get('MemberNumber')
    if (MemberNumber) {
        try {
            return MemberNumber
        } catch (e) {
            throw new Error('nao nao nao')
        }
    }

    throw new Error('Missing member number')
}

module.exports = {
    APP_SECRET,
    getMemberNumber,
}
