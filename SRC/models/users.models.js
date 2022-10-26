const { DataTypes } = require("sequelize");
const db = require("../tools/database");

const Users = db.define("users", {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		allowNull: false,
	},
	firstName: {
		type: DataTypes.STRING,
		allowNull: false,
		field: "firs_name",
	},
	lastName: {
		type: DataTypes.STRING,
		allowNull: false,
		field: "last_name",
	},
	email: {
		type: DataTypes.STRING,
		unique: true,
		validate: {
			isEmail: true,
		},
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	profileImage: {
		type: DataTypes.STRING,
		allowNull: false,
		field: "profile_image",
	},
	phone: {
		type: DataTypes.STRING,
		unique: true,
		allowNull: false,
	},
});

module.exports = Users;
