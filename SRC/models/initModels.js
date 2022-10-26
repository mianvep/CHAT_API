const Conversations = require("./conversation.models");
const Messages = require("./messages.models");
const Participants = require("./participants.models");
const Users = require("./users.models");

const initModels = () => {
	Conversations.belongsTo(Users);
	Users.hasMany(Conversations);

	Messages.belongsTo(Users);
	Users.hasMany(Messages);

	Messages.belongsTo(Conversations);
	Conversations.hasMany(Messages);

	Participants.belongsTo(Users);
	Users.hasMany(Participants);

	Participants.belongsTo(Conversations);
	Conversations.hasMany(Participants);
};

module.exports = initModels;
