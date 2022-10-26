// ? dependecies
const express = require("express");

//? files
const { port } = require("./config");
const db = require("./tools/database");

//?Rutes
const userRouter = require("./users/users.router");
const authRouter = require("./auth/auth.router");
const conversationsRouter = require("./conversations/conversations.router");
const messagesRouter = require("./messages/messages.router");
const initModels = require("./models/initModels");

// ?init configs
const app = express();

app.use(express.json());

db.authenticate()
	.then(() => {
		console.log("Database Authenticated");
	})
	.catch((err) => {
		console.log(err);
	});

db.sync()
	.then(() => {
		console.log("Database Synced");
	})
	.catch((err) => {
		console.log(err);
	});

initModels();

app.get("/", (req, res) => {
	res.status(200).json({
		message: "Server ok",
		users: `localhost:${port}/api/v1/users`,
	});
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/conversations", conversationsRouter);
app.use("/api/v1/messages", messagesRouter);

app.listen(port, () => {
	console.log(`Server started at port ${port}`);
});
