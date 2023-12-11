// import packages
import express from "express";
import logger from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
require("dotenv").config();
import cron from "node-cron";
import axios from "axios";
// my exports

import conn from "./configurations/db_config";
import signupRoute from "./routes/registration_and_authentication_route/signup_route";
import signinRoute from "./routes/registration_and_authentication_route/signin_route";
import profileRoute from "./routes/profile_route/profile_route";
import imageRoute from "./routes/image_route/image_route";
import productRoute from "./routes/product_route/product_route";
import cartRoute from "./routes/cart_route/cart_route";
import persistUserRoute from "./routes/registration_and_authentication_route/persist_user_route";
import signoutRoute from "./routes/registration_and_authentication_route/signout_route";
import cartItemRoute from "./routes/cart_item_route/cart_item_route";

conn;

// consts
const app = express();
const PORT = process.env.PORT || 1337;

const originURL = process.env.FRONTEND_URL || "http://localhost:3000";
const backendURL = process.env.BACKEND_URL || `http://localhost:1337/heartbeat`;
const cron_sched = process.env.CRON_SCHED || "* * * * *";

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
	cors({
		credentials: true,
		origin: originURL,
	})
);

// @routes
app.use("/signup", signupRoute);
app.use("/signin", signinRoute);
app.use("/profile", profileRoute);
app.use("/images", imageRoute);
app.use("/products", productRoute);
app.use("/cart", cartRoute);
app.use("/persistuser", persistUserRoute);
app.use("/signout", signoutRoute);
app.use("/cartitems", cartItemRoute);

app.get("/heartbeat", (req, res) => {
	return res.status(200).json("heartbeat OK");
});

app.get("/", (req, res) => res.json("connected"));
// ping server to stay alive
cron.schedule(cron_sched, async () => {
	if (process.env.ENVIRONMENT !== "production") {
		try {
			// Send an HTTP GET request to an endpoint on your server
			await axios.get("http://localhost:1337/heartbeat").then((_) => {
				console.log("Requested Successfully");
			});
		} catch (error) {
			console.error("Error sending request:", error);
		}
	} else {
		try {
			// Send an HTTP GET request to an endpoint on your server
			await axios.get(`${backendURL}/heartbeat`);
		} catch (error) {
			console.error("Error sending request:", error);
		}
	}
});

app.listen(PORT, () => {
	console.log(`Server running on PORT ${PORT}`);
});
