export function sessionChecker(req, res, next) {
  if (req.session.profile) {
    if (req.session.profile.username === req.query.id) {
      next();
    }
  } else {
    res.redirect("/user");
  }
}
