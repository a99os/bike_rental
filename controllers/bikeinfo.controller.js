const { Bikeinfo } = require("../models/models");

const getBikeinfos = async (ctx) => {
  try {
    const bikeinfo = await Bikeinfo.findAll();
    if (bikeinfo.length == 0)
      return ctx.err(400, { friendlyMsg: "Not found bikeinfo" });
    ctx.ok(200, bikeinfo);
  } catch (error) {
    ctx.err(400, error);
  }
};

const getBikeinfo = async (ctx) => {
  try {
    const bikeinfo = await Bikeinfo.findByPk(ctx.params.id);

    if (!bikeinfo) return ctx.err(400, { friendlyMsg: "Not found bikeinfo" });

    ctx.ok(200, bikeinfo);
  } catch (error) {
    ctx.err(400, err);
  }
};

const addBikeinfo = async (ctx) => {
  try {
    await Bikeinfo.create(ctx.request.body);
    ctx.ok(200, { message: "Succesfull add" });
  } catch (error) {
    ctx.err(400, error);
  }
};

const updateBikeinfo = async (ctx) => {
  try {
    await Bikeinfo.update(ctx.request.body, { where: { id: ctx.params.id } });
    ctx.ok(200, { message: "Successful update" });
  } catch (error) {
    console.log(error);
    ctx.err(400, error);
  }
};
const deleteBikeinfo = async (ctx) => {
  try {
    await Bikeinfo.destroy({ where: { id: ctx.params.id } });
    ctx.ok(200, "Successful delete");
  } catch (error) {
    ctx.err(400, error);
  }
};

module.exports = {
  getBikeinfos,
  getBikeinfo,
  addBikeinfo,
  updateBikeinfo,
  deleteBikeinfo,
};
