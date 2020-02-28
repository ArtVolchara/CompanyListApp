module.exports = function(app) {
  const express = require("express");
  const morgan = require("morgan");
  const cookieParser = require("cookie-parser");
  const session = require("express-session");
  const FileStore = require("session-file-store")(session);
  const { cookiesCleaner } = require("./auth");

  app.use(morgan("dev"));

  // Body POST запросов.
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());


  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header('Access-Control-Allow-Credentials', 'true')
    next();
  })

  // initialize cookie-parser to allow us access the cookies stored in the browser.
  app.use(cookieParser());

  // initialize express-session to allow us track the logged-in user across sessions.
  app.use(
    session({
      store: new FileStore(),
      key: "cookie",
      secret: "anything here",
      resave: false,
      saveUninitialized: false,
      cookie: {
        expires: 600000
      }
    })
  );

  app.use(cookiesCleaner);

};
