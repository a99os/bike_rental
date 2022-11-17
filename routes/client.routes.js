const Router = require("@koa/router");
const validator = require("../middleware/validator");
const { newOTP, verifyOTP } = require("../controllers/otp.controller");
const ClientPolice = require("../middleware/ClientPolice");
const {
  getClients,
  getClient,
  addClient,
  updateClient,
  deleteClient,
  loginClient,
  logoutClient,
  refreshhClientToken,
} = require("../controllers/client.controller");
const router = new Router();

router.get("/", getClients);
router.get("/:id", ClientPolice, getClient);
router.post("/newotp", newOTP);
router.post("/login", verifyOTP, loginClient);
router.post("/logout", logoutClient);
router.post("/refresh", refreshhClientToken);
router.post("/", validator("client"), addClient);
router.put("/:id", validator("client"), updateClient);
router.delete("/:id", deleteClient);

module.exports = () => router.routes();
