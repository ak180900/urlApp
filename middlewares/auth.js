const { getUser } = require('../service/auth')
const jwt = require('jsonwebtoken');
async function restrictToLoggedinUserOnly(req, res, next)
{

    const token = req.cookies?.jwt;
    if(!token)
    {
        return res.redirect("/login");
    }

    const user = jwt.verify(token, "mysecret");

    if(!user) 
    {
        return res.redirect("/login");
    }

    console.log(user)
    console.log(user.id);

    req.user = user.id;
    // res.user = user;
    next();

};

async function checkAuth(req, res, next)
{
    const userUid = req.cookies?.uid;
    
    const user = getUser(userUid);
    console.log(user);
    req.user = user;
    next();
}

// async function checkLogin(req, res)
// {
//     const token = req.cookies?.jwt;
//     if(!token)
//     {
//         return false;
//     }

//     const user = jwt.verify(token, "mysecret");

//     if(!user) 
//     {
//         return false;
//     }

//     return true;
// }

const checkLogin = (req, res, next) => {
    const token = req.cookies?.jwt;
    if (token) 
    {
      jwt.verify(token, 'mysecret', async (err, decodedToken) => {
        if (err) 
        {
          res.locals.user = false;
          next();
        } 
        else 
        {
        //   let user = await User.findById(decodedToken.id);
          res.locals.user = true;
          next();
        }
      });
    } 
    else {
      res.locals.user = false;
      next();
    }
  };

module.exports = {
    restrictToLoggedinUserOnly,
    checkAuth,
    checkLogin
}