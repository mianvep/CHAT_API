const passport = require("passport");
const {
	getMessageByConversation,
	getMessageById,
	deleteMessage,
} = require("../messages/messages.services");

const {
	getParticipantById,
	getParticipantByConversation,
	deleteParticipant,
	createParticipant,
} = require("../participants/participants.services");
const services = require("./conversations.services");
const router = require("express").Router();

require("../middlewares/auth.midddleware")(passport);

router
	.route("/")
	.get(
		passport.authenticate("jwt", { session: false }),
		services.getAllConversations
	)
	.post(
		passport.authenticate("jwt", { session: false }),
		services.createConversation
	);

router
	.route("/:id")
	.get(
		passport.authenticate("jwt", { session: false }),
		services.getConversationsById
	)
	.patch(
		passport.authenticate("jwt", { session: false }),
		services.updateConversation
	)
	.delete(
		passport.authenticate("jwt", { session: false }),
		services.deleteConversation
	);

//! Messages sections
//? Acá manejamos la ruta para obtener el mensaje de una conversacion (/api/v1/conversations/:conversation_id/messages)
router.get(
	"/:id/messages",
	passport.authenticate("jwt", { session: false }),
	getMessageByConversation
);

//? Acá manejamos la ruta /api/v1/conversations/:conversation_id/messages/:message_id
router
	.route("/:id/messages/:id")
	.get(passport.authenticate("jwt", { session: false }), getMessageById)
	.delete(passport.authenticate("jwt", { session: false }), deleteMessage);

//! Particiapnts section
router
	.route("/:id/participants")
	.get(
		passport.authenticate("jwt", { session: false }),
		getParticipantByConversation
	)
	.post(passport.authenticate("jwt", { session: false }), createParticipant);

router
	.route("/:id/participants/:id")
	.get(passport.authenticate("jwt", { session: false }), getParticipantById)
	.delete(passport.authenticate("jwt", { session: false }), deleteParticipant);

module.exports = router;
