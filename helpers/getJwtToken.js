const jwt = require('jsonwebtoken');

const getJwtToken = userID => {
	return jwt.sign({ id: userID }, process.env.JWT_SECRET, {
		expiresIn: '1 day'
	});
};

module.exports = getJwtToken;
