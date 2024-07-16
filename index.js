const express = require("express");
const path = require('path');
const { connectToMongoDB } = require("./connect");
const { handleGenerateNewShortURL } = require("./controller/url");
require('dotenv').config();
// const mongouri = process.env.URI;
const mongouri = "mongodb+srv://ak18092000:dbpass123@cluster0.cc0d2ru.mongodb.net/urlShortnerApp";
const cookieParser = require('cookie-parser');
const { restrictToLoggedinUserOnly, checkAuth, checkLogin } = require('./middlewares/auth');
const URL = require('./models/url');
const urlRoute = require('./routes/url');
const userRoute = require('./routes/user');

const staticRoute = require('./routes/staticRouter')
const app = express();
// app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());

app.get('*', checkLogin);


app.use("/url", restrictToLoggedinUserOnly, urlRoute);
// app.use("/user", userRoute);
app.use('/', staticRoute);

// app.get('/', async (req, res) => {
//     const allURL = await URL.find({});
//     return res.render("home", {
//         urls: allURL});
// });

// app.get('/u/:shortId', async (req, res) => {
//     const shortId = req.params.shortId;
//     console.log(shortId);
//     const entry = await URL.findOneAndUpdate(
//         {
//             shortendURL: shortId,
//         },
//         {
//             $push: {
//                 visited: {
//                     timestamp: Date.now(),
//                 },
//             }
//         }
//     );
    
//     console.log(entry);
//     console.log(entry.redirectURL);
//     res.redirect(entry.redirectURL);
    
// });

app.get("/u/:shortId", async (req, res) => {
    const shortId = req.params.shortId;

    try {
        const entry = await URL.findOneAndUpdate(
            { shortendURL: shortId },
            {
                $push: {
                    visited: {
                        timestamp: Date.now(),
                    },
                }
            }
        );

        if (entry) {
            console.log(entry.redirectURL);
            res.redirect(entry.redirectURL);
        } else {
            res.status(404).send("Not Found");
        }
    } catch (error) {
        console.error("Error finding and updating in MongoDB:", error);
        res.status(500).send("Internal Server Error");
    }
});

let PORT = process.env.PORT || 8001;


app.listen(PORT, async function () {
    console.log("Server started at port : " + PORT);
    
    try {
        await connectToMongoDB(mongouri);
        console.log('MongoDB connected');
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
});