const Router = require("@koa/router");
const validator = require("../middleware/validator");
const {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
  refreshhUserToken,
} = require("../controllers/user.controller");
const router = new Router();
const UserPolice = require("../middleware/UserPolice");

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", validator("user"), addUser);
router.put("/:id", UserPolice, validator("user"), updateUser);
router.delete("/:id", UserPolice, deleteUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/refresh", refreshhUserToken);

module.exports = () => router.routes();
