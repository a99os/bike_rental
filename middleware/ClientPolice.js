const jwt = require("../services/JwtService");
const { Client } = require("../models/models");

module.exports = async function (ctx, next) {
  // if (req.method === "OPTIONS") {
  //   next();
  // }
  try {
    const authorization = ctx.headers.authorization;
    if (!authorization)
      return ctx.err(400, { friendlyMsg: "Client ro'yhatdan o'tmagan 1" });
    const token = authorization.split(" ")[1];
    if (!token)
      return ctx.err(400, { friendlyMsg: "Client ro'yhatdan o'tmagan 2" });
    [err, data] = await to(jwt.verifyAcces(token));
    console.log(err);
    if (err) return ctx.err(400, { friendlyMsg: err.message });
    const client = await Client.findByPk(data.id);
    ctx.id = data.id;
    return next();
  } catch (error) {
    console.log(error);
    return ctx.err(400, { friendlyMsg: "Client ro'yhatdan o'tmagan 3" });
  }
};

async function to(promise) {
  return promise.then((response) => [null, response]).catch((error) => [error]);
}
