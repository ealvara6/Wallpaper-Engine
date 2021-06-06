const jwt = require("jsonwebtoken");


exports.verify = (req, res, next) => {
    const token = req.header("token");
    if (!token) return res.status(401).json({ message: "Auth Error"});
    try {
        const decoded = jwt.verify(token, "test123");
        req.user = decoded.user
        next();
    }
    catch(e) {
        res.status(500).send({ message: "Invalid Token"});
    }
}