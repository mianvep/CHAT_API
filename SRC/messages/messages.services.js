const controllers = require("./messages.controllers");

const getAllMessages = (req, res) => {
	controllers
		.getAllMessages()
		.then((data) => res.status(200).json(data))
		.catch((err) => res.status(400).json({ message: err.message }));
};

const createMessages = (req, res) => {
	const userId = req.user.id;
	const { conversationId, message } = req.body;
	if (conversationId && message) {
		controllers
			.createMessages({ userId, conversationId, message })
			.then((data) => res.status(201).json(data))
			.catch((err) => res.status(400).json({ mesg: err.mesg }));
	} else {
		res.status(400).json({
			message: "Missing data",
			fields: {
				message: "string",
				conversationId: "uuid",
			},
		});
	}
};

const getMessageByConversation = (req, res) => {
	const conversationId = req.params.conversation_id;
	controllers
		.getMessageByConversation(conversationId)
		.then((data) => res.status(200).json(data))
		.catch((err) => res.status(400).json({ message: err.message }));
};

const getMessageById = (req, res) => {
	const id = req.params.message_id;
	controllers
		.getMessagesById(id)
		.then((data) => {
			if (data) {
				res.status(200).json(data);
			} else {
				res.status(400).json({ message: "Invalid ID" });
			}
		})
		.catch((err) => res.status(400).json({ message: err.message }));
};

const deleteMessage = (req, res) => {
	const id = req.params.message_id;
	controllers
		.deleteMessage(id)
		.then((data) => {
			if (data) {
				res.status(204).json();
			} else {
				res.status(400).json({ message: "Invalid Id" });
			}
		})
		.catch((err) => res.status(400).json({ message: err.message }));
};

module.exports = {
	getAllMessages,
	createMessages,
	getMessageByConversation,
	getMessageById,
	deleteMessage,
};
