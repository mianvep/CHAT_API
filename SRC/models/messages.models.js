const { DataTypes } = require("sequelize");
const db = require("../tools/database");
const Conversations = require("./conversation.models");
const Users = require("./users.models");

const Messages = db.define("messages", {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		allowNull: false,
	},
	userId: {
		type: DataTypes.UUID,
		allowNull: false,
		field: "sender_id",
		references: {
			key: "id",
			model: Users,
		},
	},
	conversationId: {
		type: DataTypes.UUID,
		allowNull: false,
		field: "conversation_id",
		references: {
			key: "id",
			model: Conversations,
		},
	},
	message: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
});

module.exports = Messages;
