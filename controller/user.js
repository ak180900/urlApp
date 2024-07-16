const {v4: uuidv4} = require('uuid');
const {setUser} = require('../service/auth')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

async function handleUserSignUp(req, res)
{
    const {name, email, password} = req.body;

    await User.create({
        name, 
        email,
        password
    });

    return res.redirect('/');


}

async function handleUserLogin(req, res)
{

    const { email, password } = req.body;
    console.log(email);
    console.log(password);


    const user = await User.findOne({
        email, password
    });

    if(!user)
    {
        return res.redirect('/login');
    }    

    const token = jwt.sign({id: email, pass: password }, "mysecret");
    res.cookie('jwt', token);
    return res.redirect("/start");


}


module.exports = {
    handleUserSignUp,
    handleUserLogin
};