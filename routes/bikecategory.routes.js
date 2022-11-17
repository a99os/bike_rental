const Router = require("@koa/router");
const validator = require("../middleware/validator");
const {
  getBikecategorys,
  getBikecategory,
  addBikecategory,
  updateBikecategory,
  deleteBikecategory,
} = require("../controllers/bikecategory.controller");
const router = new Router();

router.get("/", getBikecategorys);
router.get("/:id", getBikecategory);
router.post("/", validator("bikecategory"), addBikecategory);
router.put("/:id", validator("bikecategory"), updateBikecategory);
router.delete("/:id", deleteBikecategory);

module.exports = () => router.routes();
