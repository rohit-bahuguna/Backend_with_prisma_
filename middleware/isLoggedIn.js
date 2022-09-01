const prisma = require('../prisma/index');

const jwt = require('jsonwebtoken');

const isLoggedIn = async (req, res, next) => {
	try {
		const token = req.cookies.token;
		if (!token) {
			return res
				.status(404)
				.jsson({ message: 'you are not logged in please login' });
		}
		const decode = jwt.verify(token, process.env.JWT_SECRET);

		req.user = await prisma.user.findUnique({
			where: {
				id: decode.id
			}
		});
		next();
	} catch (error) {
		console.log(error);
		res.status(400).jsson({ message: error.message });
	}
};

module.exports = isLoggedIn;
