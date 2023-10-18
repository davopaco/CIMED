import { sessions } from "../server.js";

export function sessionChecker(req, res, next) {
  try {
    console.log("Autenticando");
    console.log(req.session.profile);
    console.log(req.query.id);

    if (req.session.profile) {
      if (req.session.profile.username == req.query.id) {
        next();
      }
    } else {
      res.redirect("/user");
    }
  } catch (e) {
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
