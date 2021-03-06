const useMiddleware = require('./middleware');
const createError = require('http-errors');

const express = require('express');

const usersRouter = require('./routes/users');
const companiesRouter = require('./routes/companies');
const app = express();
useMiddleware(app);


// Подключаем mongoose.
const mongoose = require('mongoose');

mongoose.connect(
  'mongodb://localhost:27017/CompanyListApp',
  { useNewUrlParser: true, useUnifiedTopology: true },
);

app.use('/api/users/', usersRouter);
app.use('/api/companies/', companiesRouter)
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.error(err);
  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
