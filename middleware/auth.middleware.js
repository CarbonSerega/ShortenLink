const jwt = require('jsonwebtoken')
const config = require('config')
module.exports = (req, resp, next) => {
    if(req.method === 'OPTIONS') {
        return next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]

        if(!token) {
            return resp.status(401).json({message: "No authorization!"})
        }
        req.user = jwt.verify(token, config.get('jwtSecret'))
        next()

    } catch (e) {
        return resp.status(401).json({message: "No authorization!"})
    }
}