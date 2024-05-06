const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const xsClean = require('xss-clean');
const createError = require('http-errors');
const rateLimit = require('express-rate-limit');
const userRouter = require('./Routers/userRouter');

const app = express();

app.use(morgan('dev'));
app.use(xsClean());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/user",userRouter);

const reqLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 4, // Limit each IP to 4 requests per windowMs
    message: 'Too many requests from this IP, please try again later',
});

app.use(reqLimiter);

const isLoggedIn = (req, res, next) => {
    const login = true; // For demonstration, assuming the user is logged in
    if (login) {
        req.userId = 101; // Set userId property on req object
        next();
    } else {
        next(); // If the user is logged in, just continue to the route handler
    }
};

app.get('/', (req, res) => {
    res.status(200).send({
        message: 'Hello World'
    });
});

app.get('/products', (req, res) => {
    res.status(200).send({
        message: 'Hello Products',
    });
});



app.use((req, res, next) => {
    next(createError(404, 'Page Not Found'));
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).send({
        message: err.message || 'Internal Server Error',
    });
});

module.exports = app;
