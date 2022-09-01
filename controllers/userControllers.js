const cookieToken = require('../utils/cookieToken');
const prisma = require('../prisma/index');
const bcrypt = require('bcrypt');
const { ConnectionStates } = require('mongoose');
// user signup

const signUp = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		if (!name || !email || !password) {
			return res.status(400).json({ message: 'please provide all fields' });
		}
		const userCheck = await prisma.user.findUnique({
			where: {
				email
			}
		});

		if (userCheck) {
			return res.status(400).json({ message: 'email id allready exist' });
		}

		const hashPassword = await bcrypt.hash(password, 10);
		const user = await prisma.user.create({
			data: {
				name,
				email,
				password: hashPassword
			}
		});

		//send user a token
		cookieToken(user, res);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

// user login

const logIn = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({ message: 'please provide all fields' });
		}
		const user = await prisma.user.findUnique({
			where: {
				email
			}
		});

		if (!user) {
			return res.status(400).json({ message: 'user not found' });
		}
		console.log(user.password);
		const matchPassword = await bcrypt.compare(password, user.password);
		console.log(!matchPassword);
		console.log(matchPassword);
		if (!matchPassword) {
			return res.status(400).json({ message: 'Incrroct password' });
		}
		cookieToken(user, res);
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: error.message });
	}
};

const logOut = async (req, res) => {
	try {
		res.clearCookie('token');
		res.status(200).json({ success: true });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

module.exports = { signUp, logIn, logOut };
