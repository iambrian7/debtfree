const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization
        // const token = req.headers.authorization.split(" ")[1];
        console.log(`auth user: headers: = ${JSON.stringify(req.headers)}`)
        console.log(`auth user: token: = ${token}`)
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};