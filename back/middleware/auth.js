

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
function cookiesCleaner(req, res, next) {
    if (req.cookies.cookie && !req.session.username) {
      res.clearCookie("cookie");
    }
    next();
  }

  module.exports = {
    cookiesCleaner
  };