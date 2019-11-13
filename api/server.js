const express = require('express');
const apiRouter = require('./api-router.js');
const configMiddleware = require ('./config-middleware.js');
const session = require('express-session');
const KnexSessionStorage = require('connect-session-knex')(session);

const authRouter = require('../auth/auth-router.js')
const usersRouter = require('../users/users-router.js');
const knexConnection = require('../database/dbConfig.js');

const server = express();
configMiddleware(server);

// 2) Configure sessions and cookies:
const sessionConfiguration = {
    name: 'Odin',
    secret: process.env.COOKIE_SECRET || 'Wanderer of Ecstacy',
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: process.env.NODE_ENV === 'development' ? false:true,
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: true,
    store: new KnexSessionStorage({
        knex: knexConnection,
        clearInterval: 1000 * 60 * 30,
        tablename: 'user_sessions',
        sidfieldname: 'id',
        createtable: 'true',
    })
};

//Global
server.use(session(sessionConfiguration));

//Local(?)
server.use('/api', apiRouter);
server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);


module.exports = server;
