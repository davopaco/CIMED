import { sessions } from "../server.js";

export function sessionChecker(req, res, next) {
  console.log("Autenticando");
  if (req.session.profile) {
    if (req.session.profile.username === req.query.id) {
      next();
    }
  } else {
    res.redirect("/user");
  }
}

export function logoutSession(req, res, next) {
  const index = sessions.indexOf(req.session.profile.username);
  sessions.splice(index, 1);
  req.session.destroy(function (err) {
    console.log("Destroyed session");
  });
  res.redirect("/");
}
