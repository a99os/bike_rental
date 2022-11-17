const { Token } = require("../models/models");

const getTokens = async (ctx) => {
  try {
    const client = await Token.findAll();
    if (client.length == 0)
      return ctx.err(400, { friendlyMsg: "Not found Token" });
    ctx.ok(200, client);
  } catch (error) {
    ctx.err(400, error);
  }
};
const addToken = async (opt) => {
  try {
    await Token.create(opt);
    console.log("succesfull add token");
    return true;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addToken, getTokens };
