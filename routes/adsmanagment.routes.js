const Router = require("@koa/router");
const validator = require("../middleware/validator");
const {
  getAdsmanagments,
  getAdsmanagment,
  addAdsmanagment,
  updateAdsmanagment,
  deleteAdsmanagment,
} = require("../controllers/adsmanagment.controller");
const router = new Router();

router.get("/", getAdsmanagments);
router.get("/:id", getAdsmanagment);
router.post("/", validator("adsmanagment"), addAdsmanagment);
router.put("/:id", validator("adsmanagment"), updateAdsmanagment);
router.delete("/:id", deleteAdsmanagment);

module.exports = () => router.routes();
