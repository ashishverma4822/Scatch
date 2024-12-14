const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const path = require('path');

const expressSession = require("express-session");
const flash = require("connect-flash");

const dbConnection = require('./config/mongoose-connection');

const ownersRouter = require('./routes/ownersRouter');
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');
const index = require('./routes/index');


// const morgan = require('morgan');

require("dotenv").config();

// app.use(morgan());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(
    expressSession({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");

app.use('/',index);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products",productsRouter);

app.listen(3000);