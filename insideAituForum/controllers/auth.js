const User = require("../models/user");
const bycrypt = require("bcryptjs");

exports.getLogin = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
    oldInput: {
      email: "",
      password: "",
    },
    validationErrors: [],
    errorMessage: message,
    path: {
      category: true,
    },
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("signup", {
    path: "/signup",
    pageTitle: "Signup",
    isAuthenticated: false,
    errorMessage: message,
    oldInput: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationErrors: [],
    errorMessage: message,
    path: {
      category: true,
    },
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log("Debug one");

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(442).render("login", {
          path: "/login",
          pageTitle: "Login",
          isAuthenticated: false,
          errorMessage: "Invalid email or password",
          oldInput: {
            email: email,
            password: password,
          },
          validationErrors: [],
          path: {
            category: true,
          },
        });
      }
      bycrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              console.log("Debug Three");
              res.redirect("/admin/profile");
            });
          }
          return res.status(442).render("login", {
            path: "/login",
            pageTitle: "Login",
            isAuthenticated: false,
            errorMessage: "Invalid email or password",
            oldInput: {
              email: email,
              password: password,
            },
            validationErrors: [],
            path: {
              category: true,
            },
          });
        })
        .catch((err) => {
          console.log("Err" + err);
          res.redirect("/");
        });
    })
    .catch((err) => {
      console.log("Debug Two");
      const error = new Error("Cannot Connect to Server");
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const confirmPassword = req.body.confirmPassword;
  if (password !== confirmPassword) {
    req.flash("error", "Passwords doesn't match");
    res.redirect("/signup");
  }
  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        req.flash("error", "User already Exists");
        return Promise.reject(
          "Email exists already please pick a diffrent one"
        );
      }
    })
    .then((result) => {
      bycrypt.hash(password, 12).then((hashedPassword) => {
        console.log(hashedPassword);
        const user = new User({
          name: name,
          email: email,
          password: hashedPassword,
        });
        user.save();
        req.session.isLoggedIn = true;
        req.session.user = user;
        return req.session.save((err) => {
          res.redirect("/");
        });
      });
    })
    .catch((err) => {
      console.log("ERRR");
      res.redirect("/signup");
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/login");
  });
};

exports.getReset = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/reset", {
    path: "/reset",
    pageTitle: "Reset Password",
    errorMessage: message,
  });
};

exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect("/reset");
    }
    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          req.flash("error", "No account with that email found");
          res.redirect("/reset");
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();
      })
      .then((result) => {
        res.redirect("/");
      })
      .catch((err) => {
        const error = new Error("Creating a product failed:) ");
        error.httpStatusCode = 500;
        return next(error);
      });
  });
};

exports.getNewPassword = (req, res, next) => {
  const token = req.params.token;
  User.findOne({
    resetToken: token,
    resetTokenExpiration: { $gt: Date.now() },
  })
    .then((user) => {
      let message = req.flash("error");
      if (message.length > 0) {
        message = message[0];
      } else {
        message = null;
      }
      res.render("auth/new-password", {
        path: "/new-password",
        pageTitle: "New Password",
        errorMessage: message,
        userId: user._id.toString(),
        passwordToken: token,
      });
    })
    .catch((err) => {
      const error = new Error("Creating a new passowrd failed");
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postNewPassword = (req, res, next) => {
  const newPassword = req.body.password;
  const userId = req.body.userId;
  const passwordToken = req.body.passwordToken;
  let resetUser;

  User.findOne({
    resetToken: passwordToken,
    resetTokenExpiration: { $gt: Date.now() },
    _id: userId,
  })
    .then((user) => {
      resetUser = user;
      return bycrypt.hash(newPassword, 12);
    })
    .then((hashedPassword) => {
      resetUser.password = hashedPassword;
      resetUser.resetToken = undefined;
      resetUser.resetTokenExpiration = undefined;
      return resetUser.save();
    })
    .then((result) => {
      res.redirect("/login");
    })
    .catch((err) => {
      const error = new Error("Creating failed ");
      error.httpStatusCode = 500;
      return next(error);
    });
};
