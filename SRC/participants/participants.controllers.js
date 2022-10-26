const uuid = require("uuid");
const Participants = require("../models/participants.models");

const getAllParticipants = async () => {
	const data = await Participants.findAll();
	return data;
};

const createParticipant = async (data) => {
	const newParticipant = await Participants.create({
		id: uuid.v4(),
		userId: data.userId,
		conversationId: data.conversationId,
	});
	return newParticipant;
};

const getParticipantById = async (id) => {
	const data = await Participants.findOne({
		where: { id },
	});
	return data;
};

const deleteParticipant = async (id) => {
	const data = await Participants.destroy({
		where: { id },
	});
	return data;
};

const getParticipantByConversation = async (conversationId) => {
	const data = await Participants.findAll({
		where: { conversationId },
	});
	return data;
};

module.exports = {
	getAllParticipants,
	createParticipant,
	getParticipantById,
	deleteParticipant,
	getParticipantByConversation,
};
