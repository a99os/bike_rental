const Router = require("@koa/router");
const validator = require("../middleware/validator");
const {
  getUsergroups,
  getUsergroup,
  addUsergroup,
  updateUsergroup,
  deleteUsergroup,
} = require("../controllers/usergroup.controller");
const router = new Router();

router.get("/", getUsergroups);
router.get("/:id", getUsergroup);
router.post("/", validator("usergroup"), addUsergroup);
router.put("/:id", validator("usergroup"), updateUsergroup);
router.delete("/:id", deleteUsergroup);

module.exports = () => router.routes();
