const Router = require("@koa/router");
const validator = require("../middleware/validator");
const {
  getPayments,
  getPayment,
  addPayment,
  updatePayment,
  deletePayment,
} = require("../controllers/payment.controller");
const router = new Router();

router.get("/", getPayments);
router.get("/:id", getPayment);
router.post("/", validator("payment"), addPayment);
router.put("/:id", validator("payment"), updatePayment);
router.delete("/:id", deletePayment);

module.exports = () => router.routes();
