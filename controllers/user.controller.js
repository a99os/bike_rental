const { User, Token } = require("../models/models");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("../services/JwtService");
const DeviceDetector = require("node-device-detector");
const { addToken } = require("./token.controller");
const detector = new DeviceDetector({
  clientIndexes: true,
  deviceIndexes: true,
  deviceAliasCode: true,
});

const getUsers = async (ctx) => {
  try {
    const user = await User.findAll();
    if (user.length == 0)
      return ctx.err(400, { friendlyMsg: "Not found user" });
    ctx.ok(200, user);
  } catch (error) {
    ctx.err(400, error);
  }
};

const getUser = async (ctx) => {
  try {
    const user = await User.findByPk(ctx.params.id);

    if (!user) return ctx.err(400, { friendlyMsg: "Not found user" });

    ctx.ok(200, user);
  } catch (error) {
    ctx.err(400, error);
  }
};

const addUser = async (ctx) => {
  try {
    ctx.request.body.password = bcrypt.hashSync(ctx.request.body.password, 7);
    await User.create(ctx.request.body);
    ctx.ok(200, { message: "Succesfull add" });
  } catch (error) {
    ctx.err(400, error);
  }
};

const updateUser = async (ctx) => {
  try {
    if (ctx.id !== ctx.params.id)
      return ctx.err(400, { friendlyMsg: "Siz boshqa adminsiz" });
    ctx.request.body.password = bcrypt.hashSync(ctx.request.body.password, 7);
    await User.update(ctx.request.body, { where: { id: ctx.params.id } });
    ctx.ok(200, { message: "Successful update" });
  } catch (error) {
    console.log(error);
    ctx.err(400, error);
  }
};
const deleteUser = async (ctx) => {
  try {
    console.log(ctx.id, ctx.params.id);
    if (ctx.id.toString() !== ctx.params.id)
      return ctx.err(400, { friendlyMsg: "Siz boshqa adminsiz" });
    await User.destroy({ where: { id: ctx.params.id } });
    ctx.ok(200, "Successful delete");
  } catch (error) {
    ctx.err(400, error);
  }
};
const loginUser = async (ctx) => {
  try {
    let user = await User.findOne({
      where: {
        email: ctx.request.body.email,
      },
    });
    if (!user)
      return ctx.err(400, {
        friendlyMsg: "email yoki parol noto'g'ri",
      });
    const validPassword = bcrypt.compareSync(
      ctx.request.body.password,
      user.password
    );
    if (!validPassword)
      return ctx.err(400, { friendlyMsg: "email yoki parol noto'g'ri" });

    const payload = {
      id: user.id,
    };
    const tokens = jwt.generateTokens(payload);
    const userAgent = ctx.headers["user-agent"];
    const result = detector.detect(userAgent);
    const opt = {
      user_id: user.id,
      table_name: "user",
      user_os: result.os.name,
      user_device: result.device.type,
      user_browser: result.client.name,
      token: tokens.refreshToken,
    };

    ctx.cookies.set("refreshToken", tokens.refreshToken, {
      maxAge: config.get("refresh_ms"),
      httpOnly: true,
    });
    await addToken(opt);
    ctx.ok(200, tokens);
  } catch (error) {
    console.log(error);
    ctx.err(500, error);
  }
};
const logoutUser = async (ctx) => {
  try {
    const refreshToken = ctx.cookies.get("refreshToken");
    let token;
    if (!refreshToken) return ctx.err(400, { friendlyMsg: "Token topilmadi" });
    console.log(refreshToken);
    token = await Token.findOne({ where: { token: refreshToken } });
    if (!token) return ctx.err(400, { friendlyMsg: "Token topilmadi" });
    await Token.destroy({ where: { token: refreshToken }, returning: true });

    ctx.cookies.set("refreshToken", null);
    ctx.ok(200, { message: "Succesfull logout" });
  } catch (err) {
    ctx.err(400, err);
  }
};

const refreshhUserToken = async (ctx) => {
  try {
    const refreshToken = ctx.cookies.get("refreshToken");
    if (!refreshToken) return ctx.err(400, { friendlyMsg: "Token topilmadi" });
    const userDataFromCookie = await jwt.verifyRefresh(refreshToken);
    const userDataFromDB = await Token.findOne({
      where: {
        token: refreshToken,
      },
    });
    if (!userDataFromCookie || !userDataFromDB)
      return ctx.err(400, { friendlyMsg: "User ro'yhatdan o'tmagan" });
    const user = await User.findOne({
      where: { id: userDataFromCookie.id },
    });
    if (!user) return res.error(400, { friendlyMsg: "ID no'tog'ri" });

    const payload = {
      id: user.id,
    };
    const tokens = jwt.generateTokens(payload);
    await Token.update(
      { token: tokens.refreshToken },
      { where: { token: refreshToken } }
    );
    ctx.cookies.set("refreshToken", tokens.refreshToken, {
      maxAge: config.get("refresh_ms"),
      httpOnly: true,
    });

    ctx.ok(200, tokens);
  } catch (err) {
    ctx.err(400, err);
  }
};

module.exports = {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
  refreshhUserToken,
};
