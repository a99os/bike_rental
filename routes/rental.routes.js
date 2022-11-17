const Router = require("@koa/router");
const validator = require("../middleware/validator");
const {
  getRentals,
  getRental,
  addRental,
  updateRental,
  deleteRental,
} = require("../controllers/rental.controller");
const router = new Router();

router.get("/", getRentals);
router.get("/:id", getRental);
router.post("/", validator("rental"), addRental);
router.put("/:id", validator("rental"), updateRental);
router.delete("/:id", deleteRental);

module.exports = () => router.routes();
