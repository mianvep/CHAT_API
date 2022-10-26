const controllers = require("./participants.controllers");

const getAllParticipants = (req, res) => {
	controllers
		.getAllParticipants()
		.then((data) => res.status(200).json(data))
		.catch((err) => res.status(400).json({ message: err.message }));
};

const createParticipant = (req, res) => {
	const userId = req.user.id;
	const { conversationId } = req.body;
	if (conversationId) {
		controllers
			.createParticipant({ userId, conversationId })
			.then((data) => res.status(201).json(data))
			.catch((err) => res.status(400).json({ mesg: err.mesg }));
	} else {
		res.status(400).json({
			message: "Missing data",
			fields: {
				conversationId: "uuid",
			},
		});
	}
};

const getParticipantByConversation = (req, res) => {
	const conversationId = req.params.id;
	controllers
		.getParticipantByConversation(conversationId)
		.then((data) => res.status(200).json(data))
		.catch((err) => res.status(400).json({ message: err.message }));
};

const getParticipantById = (req, res) => {
	const id = req.params.id;
	controllers
		.getParticipantById(id)
		.then((data) => {
			if (data) {
				res.status(200).json(data);
			} else {
				res.status(400).json({ message: "Invalid ID" });
			}
		})
		.catch((err) => res.status(400).json({ message: err.message }));
};

const deleteParticipant = (req, res) => {
	const id = req.params.id;
	controllers
		.deleteParticipant(id)
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
	getAllParticipants,
	createParticipant,
	getParticipantById,
	getParticipantByConversation,
	deleteParticipant,
};
