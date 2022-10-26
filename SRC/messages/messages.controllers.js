//@ts-check
const Messages = require("../models/messages.models");
const uuid = require("uuid");

const getAllMessages = async () => {
	const data = await Messages.findAll();
	return data;
};

const getMessagesById = async (id) => {
	const data = await Messages.findOne({
		where: { id },
	});
	return data;
};

const createMessages = async (data) => {
	const newMessage = await Messages.create({
		id: uuid.v4(),
		userId: data.userId,
		conversationId: data.conversationId,
		message: data.message,
	});
	return newMessage;
};

const deleteMessage = async (id) => {
	const data = await Messages.destroy({
		where: { id },
	});
	return data;
};

const getMessageByConversation = async (conversationId) => {
	const data = await Messages.findAll({
		where: { conversationId },
	});
	return data;
};

module.exports = {
	getAllMessages,
	getMessagesById,
	createMessages,
	deleteMessage,
	getMessageByConversation,
};
