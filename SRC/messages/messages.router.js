const passport = require("passport");
const services = require("./messages.services");
const router = require("express").Router();
require("../middlewares/auth.midddleware")(passport);

router
	.route("/")
	.get(
		passport.authenticate("jwt", { session: false }),
		services.getAllMessages
	)
	.post(
		passport.authenticate("jwt", { session: false }),
		services.createMessages
	);

router
	.route("/:id")
	.get(
		passport.authenticate("jwt", { session: false }),
		services.getMessageById
	)
	.delete(
		passport.authenticate("jwt", { session: false }),
		services.deleteMessage
	);

module.exports = router;
