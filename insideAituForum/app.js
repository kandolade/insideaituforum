const path = require("path");
const express = require("express");
const expressHbs = require("express-handlebars");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
let cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
let multer = require("multer");
const helmet = require("helmet");
const compression = require("compression");
const flash = require("connect-flash");
const User = require("./models/user");
const passport = require("passport");

require("dotenv").config();

const MONGODB_URI = `mongodb+srv://agzam:agzam@clusteratlas.9izat.mongodb.net/?retryWrites=true&w=majority`;
const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/webp"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.engine(
  "hbs",
  expressHbs({
    layoutsDir: "views/layouts/",
    defaultLayout: "main-layout",
    extname: "hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", "views");

const homeRoutes = require("./routes/home");
const fullPosts = require("./routes/fullpost");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const guestRoutes = require("./routes/guest");
const commentRoutes = require("./routes/comment");
const checkOauth = require("./routes/checkOAuth");
const publicRoutes = require("./routes/public");
const tagRoutes = require("./routes/tags");
const followRoutes = require("./routes/follow");

app.use(helmet());
app.use(compression());

app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(flash());

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); // user should be able to acess 'public' path
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use("/admin/images", express.static(path.join(__dirname, "images")));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/fullpost/images", express.static(path.join(__dirname, "images")));
app.use("/tags/images", express.static(path.join(__dirname, "images")));
app.use(
  "/public/profile/images",
  express.static(path.join(__dirname, "images"))
);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch((err) => {
      next(new Error(err));
    });
});

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
let GoogleStrategy = require("passport-google-oauth2").Strategy;
let FacebookStrategy = require("passport-facebook").Strategy;
let TwitterStrategy = require("passport-twitter").Strategy;
let LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;

app.get(
  "/auth/linkedin",
  passport.authenticate("linkedin", { state: "987654321" }),
  function (req, res) {
  }
);

app.get(
  "/auth/linkedin/callback",
  passport.authenticate("linkedin", {
    successRedirect: "/oauth/check",
    failureRedirect: "/",
  })
);

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/plus.login",
      ,
      "https://www.googleapis.com/auth/plus.profile.emails.read",
    ],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/google/success",
    failureRedirect: "/auth/google/failure",
  })
);


const index = require('./routes/index')
const playgame = require('./routes/playgame')
const buygame = require('./routes/buygame')
const wikipage = require('./routes/wiki')
const winterpatchnotes = require('./routes/winterpatchnotes')
const secretguestparty = require('./routes/secretguestparty')
const azamataipatchnotes = require('./routes/azamataipatchnotes')
const profiles = require('./routes/profiles')


app.use("/", homeRoutes);
app.use(authRoutes);
app.use("/fullpost", fullPosts);
app.use(publicRoutes);
app.use(tagRoutes);
app.use("/admin", adminRoutes);
app.use(checkOauth);
app.use(followRoutes);
app.use('/index', index)
app.use('/playgame', playgame)
app.use('/buygame', buygame)
app.use('/wiki', wikipage)
app.use('/winterpatchnotes', winterpatchnotes)
app.use('/secretguestparty', secretguestparty)
app.use('/azamataipatchnotes', azamataipatchnotes)
app.use('/profiles', profiles)



app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: " Page not Found" });
});

app.use((error, req, res, next) => {
  res.status(500).render("500", {
    pageTitle: "Error",
    path: "/500",
    error: error,
  });
});

mongoose
  .connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then((result) => {
    console.log("Server is working");
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => {
    console.log(err);
    const error = new Error("Database Connnection Error");
    error.httpStatusCode = 500;
    return next(error);
  });
