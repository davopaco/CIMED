export function sessionChecker(req, res, next) {
  if (req.session.profile) {
    if (req.session.profile.username === req.query.id) {
      next(); // Authorized, continue to serve the image
    }
  } else {
    res.redirect("/user"); // Unauthorized, return a 403 Forbidden response
  }
}
