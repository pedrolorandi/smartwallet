function checkSession(req, res, next) {
  if (req.session.userID) next();

  res.status(401).send("Not authenticated");
}

module.exports = { checkSession };
