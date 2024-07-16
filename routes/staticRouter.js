const express = require("express");
const router = express.Router();
const URL = require('../models/url');
const { restrictToLoggedinUserOnly } = require('../middlewares/auth');
const { handleUserSignUp, handleUserLogin } = require('../controller/user');

const jwt = require('jsonwebtoken');


router.get('/start', restrictToLoggedinUserOnly, async (req, res) => {
    // if (!req.user) return res.redirect("/login");
    // return res.render("home");

    // const allURL = await URL.find({ createdBy: req.user._id });
    return res.render("main");

});
router.get('/', async (req, res) => {
    
    return res.render("home");

});

router.get('/logout', async (req, res) => {

    res.cookie('jwt', "");
    return res.redirect('/');

});

router.get('/myUrls', restrictToLoggedinUserOnly, async (req, res) => {

    const user = jwt.verify(req.cookies?.jwt, 'mysecret');
    console.log(user.email);

    // console.log(req.hostname);
    // console.log(req.pathname);
    const hostName = req.hostname;
    console.log(hostName);

    const allURL = await URL.find({ createdBy: user.id });
    
    return res.render("show", {
        urls: allURL,
    });

});

router.get('/signup', async (req, res) => {
    return res.render("signup");
});

router.get('/login', async (req, res) => {
    return res.render("login");
});

router.post('/signup', handleUserSignUp);
router.post('/login', handleUserLogin);

module.exports = router;