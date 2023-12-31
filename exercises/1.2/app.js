var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var filmRouter = require('./routes/film');
const { count } = require('console');

var app = express();



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const stats = {};
app.use((req ,res, next) => {
    const data = `${req.method} ${req.path}`;
    const count = stats[data];

    if (count===undefined){
        stats[data] = 0;
    }
    stats[data] += 1;
    console.log('Request counter :');
    const statsMessage = `Compteur de requêtes : \n${Object.keys(stats)
        .map((operation) => `- ${operation} : ${stats[operation]}`)
        .join('\n')}
          `;
    console.log(statsMessage);
    next();
});

app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/film', filmRouter);

module.exports = app;
