const jwt = require('jsonwebtoken')

const jwtAuthMiddleware = (req, res, next) => {
    const authorization = req.headers.authorization
    if(!authorization) return res.status(401).json({error: 'Token not found'})

    const token = res.headers.authorization.split(' ')[1]
    if(!token) return res.status(401).json({error: 'Unauthorised user'})

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.user = decoded
        next();
    } catch (error) {
        console.error(error)
        res.status(401).json({error: 'Invalid token'})
    }
}


const generateToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET)
}

module.exports = {jwtAuthMiddleware, generateToken};