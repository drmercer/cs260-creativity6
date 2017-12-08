/*
 * Middleware that makes sure the user is authenticated.
 */

module.exports = function(req, res, next) {
	if (!req/*TODO assert authorized*/) {
		res.sendStatus(403);
	} else {
		next();
	}
};
