const Router = require("@koa/router");

const { newOTP, verifyOTP } = require("../controllers/otp.controller");
const router = new Router();

router.post("/newotp", newOTP);
router.post("/verify", verifyOTP);

module.exports = () => router.routes();
