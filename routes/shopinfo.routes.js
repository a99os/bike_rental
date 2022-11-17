const Router = require("@koa/router");
const validator = require("../middleware/validator");

const {
  getShopinfos,
  getShopinfo,
  addShopinfo,
  updateShopinfo,
  deleteShopinfo,
} = require("../controllers/shopinfo.controller");
const router = new Router();

router.get("/", getShopinfos);
router.get("/:id", getShopinfo);
router.post("/", validator("shopinfo"), addShopinfo);
router.put("/:id", updateShopinfo);
router.delete("/:id", deleteShopinfo);

module.exports = () => router.routes();
