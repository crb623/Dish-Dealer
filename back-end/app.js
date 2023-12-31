// import and instantiate express
const express = require("express");
const bodyParser = require('body-parser');

//needed
const app = express();

//middleware function
app.use(bodyParser.json({ limit: '50mb' }));
//middleware function
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

//port front end is running on
const port = 3000;

// import some useful middleware
// const multer = require("multer"); // middleware to handle HTTP POST requests with file uploads
const axios = require("axios"); // middleware for making requests to APIs
require("dotenv").config({ silent: true }); // load environmental variables from a hidden file named .env
const morgan = require("morgan"); // middleware for nice logging of incoming HTTP requests
var cors = require("cors");

// import dish router
const dishRouter = require("./routes/dish");
// import rating router
const ratingRouter = require("./routes/rating");
// import restaurant router
const restaurantRouter = require("./routes/restaurant");
// import suggestion router
const suggestionRouter = require("./routes/suggestion");
// import search router
const searchRouter = require("./routes/search");
// import register router
const registerRouter = require("./routes/register");
// import login router
const loginRouter = require("./routes/login");
// import profile router
const profileRouter = require("./routes/profile");
// import avatar router
const avatarRouter = require("./routes/avatar");
// import fav router
const favsRouter = require("./routes/favs");

/**
 * Typically, all middlewares would be included before routes
 * In this file, however, most middlewares are after most routes
 * This is to match the order of the accompanying slides
 */

// cors for front-end
app.use(cors());

//all example code from prof

// use the morgan middleware to log all incoming http requests
app.use(morgan("dev")); // morgan has a few logging default styles - dev is a nice concise color-coded style

// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()); // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })); // decode url-encoded incoming POST data

// make 'public' directory publicly readable with static content
app.use("/public", express.static("public"));


/**
 * some common status codes for returning responses
 *
 * // Only use InternalServerErrorStatusCode as a placeholder;
 * find the right one here: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
 */
const successStatusCode = 200;
const resourceNotFoundStatusCode = 404;
const internalServerErrorStatusCode = 500;
/**
 * some error messages for returning responses
 */
const genericSuccessMessage = "All good :)";
const genericErrorMessage = "There has been an error :(";

/**
 * template "GET" route for path "/"
 */
app.get("/", (req, res) => {
  // get object from API (mockeroo for now)
  const apiResponse = {
    data: "hello. welcome to our server!",
  };
  const isError = false;

  // this part responds based on whether there was an error.
  let response;
  if (!isError) {
    response = {
      statusCode: successStatusCode,
      body: {
        ...apiResponse,
        message: genericSuccessMessage,
      },
    };
  } else {
    // handle error
    response = {
      statusCode: InternalServerErrorStatusCode,
      body: genericErrorMessage,
    };
  }
  res.json(response);
});
/**
 * template "POST" route for path "/"
 */
app.post("/", (req, res) => {
  res.send("Got a POST request");
});
/**
 * template "PUT" route for path "/"
 */
app.put("/", (req, res) => {
  res.send("Got a PUT request at /user");
});
/**
 * template "DELETE" route for path "/"
 */
app.delete("/", (req, res) => {
  res.send("Got a DELETE request at /user");
});

// implement routers
app.use("/restaurant/:restaurantId/dish/:dishId/review", ratingRouter); // review routes
app.use("/restaurant/:restaurantId/dish", dishRouter); // dish routes
app.use("/restaurant", restaurantRouter); // restaurant routes
app.use("/suggestion", suggestionRouter); // suggestion routes
app.use("/search", searchRouter); // search routes
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/profile", profileRouter);
app.use("/avatar", avatarRouter);
app.use("/favorites",favsRouter);

module.exports = app;
