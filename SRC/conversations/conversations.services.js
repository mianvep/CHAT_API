//@ts-check
const controllers = require("./conversation.controllers");

const getAllConversations = (req, res) => {
	controllers
		.getAllConversations()
		.then((data) => res.status(200).json(data))
		.catch((err) => res.status(400).json({ message: err.message }));
};

const createConversation = (req, res) => {
	const userId = req.user.id;
	const { title, imageUrl } = req.body;
	if (title && imageUrl) {
		controllers
			.createConversation({ title, imageUrl, userId })
			.then((data) => res.status(201).json(data))
			.catch((err) => res.status(400).json({ message: err.message }));
	} else {
		res.status(400).json({
			message: "Missing data",
			field: {
				title: "string",
				imageUrl: "http://",
			},
		});
	}
};

const getConversationsById = (req, res) => {
	const conversationId = req.params.id;
	controllers
		.getConversationsById(conversationId)
		.then((response) => res.status(200).json(response))
		.catch((err) => res.status(400).json({ message: err.message }));
};

const updateConversation = (req, res) => {
	const id = req.params.id;
	const { title, imageUrl } = req.body;
	controllers
		.updateConversation(id, { title, imageUrl })
		.then((response) => {
			if (response[0]) {
				res.status(200).json({
					message: `Conversation with id: ${id} has edited successfully`,
				});
			} else {
				res.status(400).json({ message: "Invalid conversation id" });
			}
		})
		.catch((err) => res.status(400).json({ message: err.message }));
};

const deleteConversation = (req, res) => {
	const id = req.params.id;
	controllers
		.deleteConversation(id)
		.then((response) => {
			if (response) {
				res.status(204).json();
			} else {
				res.status(400).json({ message: "Invalid conversation id" });
			}
		})
		.catch((err) => res.status(400).json({ message: err.message }));
};

module.exports = {
	getAllConversations,
	createConversation,
	getConversationsById,
	updateConversation,
	deleteConversation,
};
