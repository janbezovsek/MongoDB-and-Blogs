const express = require('express')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const cors = require('cors')
const mongoSanitizer = require('express-mongo-sanitize')
const globalErrorHandler = require('./utils/errors/GlobalErrorHandler')
const AppErrorHandler = require('./utils/errors/appError')
const postRouter = require("./routes/postRoutes")
const authRouter = require("./routes/authRoutes")


const app = express()

app.use(cors())

//Setting HTTP security headers
app.use(helmet())

//Prevent DoS Attacks via body limiting
app.use(express.json({limit: "50kb"}))

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//Rate limiter, preventing Brute Force and DoS Attacks
const limiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 60 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 60 minutes).
	message: "Too many requests, please try later"
})

app.get('/',(req, res) => {
  res.send('Backend is alive')
})

//It's used for all routes in this case
app.use("/api", limiter)

//Prevent NoSQL query injections via data sanitization
app.use(mongoSanitizer())

// Curb Cores Error by adding a header here
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
  });


//Routes
app.use("/api/v1/post", postRouter)
app.use("/api/v1/auth", authRouter)

//Error handler for not defined routes
app.all("*",(req, res, next) => {

    const error = new AppErrorHandler("Route is not defined", 404)

    next(error)
})

//Global error handler
app.use(globalErrorHandler)



module.exports = app