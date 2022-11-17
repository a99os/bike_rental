const { Shopinfo } = require("../models/models");

const getShopinfos = async (ctx) => {
  try {
    const shopinfo = await Shopinfo.findAll();
    if (shopinfo.length == 0)
      return ctx.err(400, { friendlyMsg: "Not found shop info" });
    ctx.ok(200, shopinfo);
  } catch (error) {
    ctx.err(400, error);
  }
};

const getShopinfo = async (ctx) => {
  try {
    const shopinfo = await Shopinfo.findByPk(ctx.params.id);

    if (!shopinfo) return ctx.err(400, { friendlyMsg: "Not found shop info" });

    ctx.ok(200, shopinfo);
  } catch (error) {
    ctx.err(400, err);
  }
};

const addShopinfo = async (ctx) => {
  try {
    const shopinfo = await Shopinfo.create(ctx.request.body);
    console.log(shopinfo);
    ctx.ok(200, { message: "Succesfull add" });
  } catch (error) {
    console.log(error);
    ctx.err(400, error);
  }
};

const updateShopinfo = async (ctx) => {
  try {
    await Shopinfo.update(ctx.request.body, { where: { id: ctx.params.id } });
    ctx.ok(200, { message: "Successful update" });
  } catch (error) {
    console.log(error);
    ctx.err(400, error);
  }
};
const deleteShopinfo = async (ctx) => {
  try {
    await Shopinfo.destroy({ where: { id: ctx.params.id } });
    ctx.ok(200, "Successful delete");
  } catch (error) {
    ctx.err(400, error);
  }
};

module.exports = {
  getShopinfos,
  getShopinfo,
  addShopinfo,
  updateShopinfo,
  deleteShopinfo,
};
