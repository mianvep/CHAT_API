const { DataTypes } = require("sequelize");
const db = require("../tools/database");
const Users = require("./users.models");

const Conversations = db.define("conversations", {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		allowNull: false,
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	imageUrl: {
		type: DataTypes.STRING,
		field: "image_url",
	},
	userId: {
		type: DataTypes.UUID,
		allowNull: false,
		field: "created_by",
		references: {
			key: "id",
			model: Users,
		},
	},
});

module.exports = Conversations;
