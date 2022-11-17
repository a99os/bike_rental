const { Client, Token } = require("../models/models");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("../services/JwtService");
const DeviceDetector = require("node-device-detector");
const detector = new DeviceDetector({
  clientIndexes: true,
  deviceIndexes: true,
  deviceAliasCode: true,
});
const { addToken } = require("../controllers/token.controller");

const getClients = async (ctx) => {
  try {
    const client = await Client.findAll();
    if (client.length == 0)
      return ctx.err(400, { friendlyMsg: "Not found client" });
    ctx.ok(200, client);
  } catch (error) {
    ctx.err(400, error);
  }
};

const getClient = async (ctx) => {
  try {
    const client = await Client.findByPk(ctx.params.id);

    if (!client) return ctx.err(400, { friendlyMsg: "Not found client" });

    ctx.ok(200, client);
  } catch (error) {
    ctx.err(400, err);
  }
};

const addClient = async (ctx) => {
  try {
    ctx.request.body.password = bcrypt.hashSync(ctx.request.body.password, 7);
    await Client.create(ctx.request.body);
    ctx.ok(200, { message: "Succesfull add" });
  } catch (error) {
    ctx.err(400, error);
  }
};

const updateClient = async (ctx) => {
  try {
    if (ctx.id != ctx.params.id)
      return ctx.err(400, { friendlyMsg: "Siz boshqa clientsiz" });
    ctx.request.body.password = bcrypt.hashSync(ctx.request.body.password, 7);
    await Client.update(ctx.request.body, { where: { id: ctx.params.id } });
    ctx.ok(200, { message: "Successful update" });
  } catch (error) {
    console.log(error);
    ctx.err(400, error);
  }
};
const deleteClient = async (ctx) => {
  try {
    if (ctx.id != ctx.params.id)
      return ctx.err(400, { friendlyMsg: "Siz boshqa clientsiz" });
    await Client.destroy({ where: { id: ctx.params.id } });
    ctx.ok(200, "Successful delete");
  } catch (error) {
    ctx.err(400, error);
  }
};

const loginClient = async (ctx) => {
  try {
    const payload = {
      id: ctx.id,
    };
    const tokens = jwt.generateTokens(payload);
    const userAgent = ctx.headers["user-agent"];
    const result = detector.detect(userAgent);
    const opt = {
      user_id: ctx.id,
      table_name: "client",
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
    tokens.id = ctx.id;
    ctx.ok(200, tokens);
  } catch (error) {
    ctx.err(500, error);
  }
};
const logoutClient = async (ctx) => {
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

const refreshhClientToken = async (ctx) => {
  try {
    const refreshToken = ctx.cookies.get("refreshToken");
    if (!refreshToken) return ctx.err(400, { friendlyMsg: "Token topilmadi" });
    const clientDataFromCookie = await jwt.verifyRefresh(refreshToken);
    const clientDataFromDB = await Token.findOne({
      where: {
        token: refreshToken,
      },
    });
    if (!clientDataFromCookie || !clientDataFromDB)
      return ctx.err(400, { friendlyMsg: "Client ro'yhatdan o'tmagan" });
    const client = await Client.findOne({
      where: { id: clientDataFromCookie.id },
    });
    if (!client) return res.error(400, { friendlyMsg: "ID no'tog'ri" });

    const payload = {
      id: client.id,
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
  getClients,
  getClient,
  addClient,
  updateClient,
  deleteClient,
  loginClient,
  logoutClient,
  refreshhClientToken,
};
