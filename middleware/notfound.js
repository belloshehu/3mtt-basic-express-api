const notFoundError = (req, res, next) => {
	res.status(404).send(`Route ${req.path} not found`);
};

module.exports = notFoundError;
