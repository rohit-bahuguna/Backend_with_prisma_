const prisma = require('../prisma/index');

const createPost = async (req, res, next) => {
	try {
		const { slug, title, body, authorId } = req.body;
		if (!slug || !title || !body || !authorId) {
			return res.status(400).json({ message: 'please provide all fields ' });
		}

		const response = await prisma.post.create({
			data: {
				slug,
				title,
				body,
				author: { connect: { id: authorId } }
			}
		});
		res.status(200).json(response);
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: error.message });
	}
};

const updatePost = async (req, res) => {
	try {
		const { id } = req.params;
		const { title, body } = req.body;

		const response = await prisma.post.update({
			where: { id: id },
			data: {
				title,
				body
			}
		});
		res.status(200).json(response);
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: message.error });
	}
};

const showAllPost = async (req, res) => {
	try {
		const response = await prisma.post.findMany();
		res.status(200).json(response);
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: error.message });
	}
};

const deletePost = async (req, res) => {
	try {
		const { id } = req.params;

		const response = await prisma.post.delete({
			where: {
				id: id
			}
		});
		res.status(200).json(response);
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: message.error });
	}
};

module.exports = { createPost, showAllPost, deletePost, updatePost };
