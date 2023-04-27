// import packages
const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

// my exports

const conn = require("./configurations/db_config");
const signupRoute = require("./routes/registration_and_authentication_route/signup_route");
const signinRoute = require("./routes/registration_and_authentication_route/signin_route");
const profileRoute = require("./routes/profile_route/profile_route");
const imageRoute = require("./routes/image_route/image_route");
const productRoute = require("./routes/product_route/product_route");
const cartRoute = require("./routes/cart_route/cart_route");
const persistUserRoute = require("./routes/registration_and_authentication_route/persist_user_route");
const signoutRoute = require("./routes/registration_and_authentication_route/signout_route");
const cartItemRoute = require("./routes/cart_item_route/cart_item_route");
const { default: mongoose } = require("mongoose");

conn;

// consts
const app = express();
const PORT = process.env.PORT || 1337;

const originURL = process.env.FRONTEND_URL || "http://localhost:3000";

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

app.get("/", (req, res) => res.json("connected"));

app.listen(PORT, () => {
	console.log(`Server running on PORT ${PORT}`);
});
