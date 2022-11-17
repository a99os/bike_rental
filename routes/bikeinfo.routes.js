const Router = require("@koa/router");
const validator = require("../middleware/validator");
const {
  getBikeinfos,
  getBikeinfo,
  addBikeinfo,
  updateBikeinfo,
  deleteBikeinfo,
} = require("../controllers/bikeinfo.controller");
const router = new Router();

router.get("/", getBikeinfos);
router.get("/:id", getBikeinfo);
router.post("/", validator("bikeinfo"), addBikeinfo);
router.put("/:id", validator("bikeinfo"), updateBikeinfo);
router.delete("/:id", deleteBikeinfo);

module.exports = () => router.routes();
