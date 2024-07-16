const jwt = require("jsonwebtoken");
const secret = "secret@123"

function setUser(user) {
    if(!user) return null;
    try {
        return jwt.sign(
            {
                _id: user._id,
                email: user.email,
            }, 
            secret
        );
    } catch (error) {
        console.log("error");
        return null;
    }
    
};

function getUser(token) {
    if(!token) return null;
    try {
        return jwt.verify(token, 'mysecret');
        
    } catch (error) {
        console.log("eeror");
    }
};

module.exports = {
    setUser,
    getUser
}
