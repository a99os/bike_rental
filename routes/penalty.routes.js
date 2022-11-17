const Router = require("@koa/router");
const validator = require("../middleware/validator");
const {
  getPenaltys,
  getPenalty,
  addPenalty,
  updatePenalty,
  deletePenalty,
} = require("../controllers/penalty.controller");
const router = new Router();

router.get("/", getPenaltys);
router.get("/:id", getPenalty);
router.post("/", validator("penalty"), addPenalty);
router.put("/:id", validator("penalty"), updatePenalty);
router.delete("/:id", deletePenalty);

module.exports = () => router.routes();
