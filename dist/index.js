"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import packages
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
require("dotenv").config();
const node_cron_1 = __importDefault(require("node-cron"));
const axios_1 = __importDefault(require("axios"));
// my exports
const db_config_1 = require("./configurations/db_config");
const signup_route_1 = __importDefault(require("./routes/registration_and_authentication_route/signup_route"));
const signin_route_1 = __importDefault(require("./routes/registration_and_authentication_route/signin_route"));
const profile_route_1 = __importDefault(require("./routes/profile_route/profile_route"));
const image_route_1 = __importDefault(require("./routes/image_route/image_route"));
const product_route_1 = __importDefault(require("./routes/product_route/product_route"));
const cart_route_1 = __importDefault(require("./routes/cart_route/cart_route"));
const persist_user_route_1 = __importDefault(require("./routes/registration_and_authentication_route/persist_user_route"));
const signout_route_1 = __importDefault(require("./routes/registration_and_authentication_route/signout_route"));
const cart_item_route_1 = __importDefault(require("./routes/cart_item_route/cart_item_route"));
db_config_1.conn;
// consts
const app = (0, express_1.default)();
const PORT = process.env.PORT || 1337;
const originURL = process.env.FRONTEND_URL || "http://localhost:3000";
const backendURL = process.env.BACKEND_URL || `http://localhost:1337/heartbeat`;
const cron_sched = process.env.CRON_SCHED || "* * * * *";
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    credentials: true,
    origin: originURL,
}));
// @routes
app.use("/signup", signup_route_1.default);
app.use("/signin", signin_route_1.default);
app.use("/profile", profile_route_1.default);
app.use("/images", image_route_1.default);
app.use("/products", product_route_1.default);
app.use("/cart", cart_route_1.default);
app.use("/persistuser", persist_user_route_1.default);
app.use("/signout", signout_route_1.default);
app.use("/cartitems", cart_item_route_1.default);
app.get("/heartbeat", (req, res) => {
    return res.status(200).json("heartbeat OK");
});
app.get("/", (req, res) => res.json("connected"));
// ping server to stay alive
node_cron_1.default.schedule(cron_sched, () => __awaiter(void 0, void 0, void 0, function* () {
    if (process.env.ENVIRONMENT !== "production") {
        try {
            // Send an HTTP GET request to an endpoint on your server
            yield axios_1.default.get("http://localhost:1337/heartbeat").then((_) => {
                console.log("Requested Successfully");
            });
        }
        catch (error) {
            console.error("Error sending request:", error);
        }
    }
    else {
        try {
            // Send an HTTP GET request to an endpoint on your server
            yield axios_1.default.get(`${backendURL}/heartbeat`);
        }
        catch (error) {
            console.error("Error sending request:", error);
        }
    }
}));
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});
