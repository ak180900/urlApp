const { nanoid } = require('nanoid');
const URL = require('../models/url.js');
const jwt = require('jsonwebtoken');

async function handleGenerateNewShortURL(req, res) {
  try {
    const { longURL } = req.body;

    // Validate if longURL is provided
    if (!longURL) {
      return res.status(400).json({ error: "URL is required" });
    }

    const short = nanoid(4);

    // Verify the JWT token and get user information
    // const user = jwt.verify(req.cookies?.jwt, 'mysecret');
    const email = req.user;

    // Check if user information is available
    // if (!user || !user.email) {
    //   return res.status(401).json({ error: "Unauthorized" });
    // }

    console.log(email);



    // Create a new URL entry in MongoDB
    await URL.create({
      shortendURL: short,
      redirectURL: longURL,
      visited: [],
      createdBy: email,
    });

    return res.redirect('/myUrls');
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  handleGenerateNewShortURL,
};
