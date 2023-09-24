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
app.use(express.static(path.join(__dirname, 'public')));

const table =  {};
app.use((req,res,next) => {
    const data = '${req.methode} ${req.path}';
    const count = table[data];

    if (count===undefined){
        table[data] = 0;
    }
    table[data] += 1;
    const statsMessage = `Compteur de requêtes : \n${Object.keys(table)
        .map((operation) => `- ${operation} : ${table[operation]}`)
        .join('\n')}
          `;
    console.log(statsMessage);
    next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/film', filmRouter);

module.exports = app;
