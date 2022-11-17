const { Adsmanagment } = require("../models/models");

const getAdsmanagments = async (ctx) => {
  try {
    const adsmanagment = await Adsmanagment.findAll();
    if (adsmanagment.length == 0)
      return ctx.err(400, { friendlyMsg: "Not found adsmanagment" });
    ctx.ok(200, adsmanagment);
  } catch (error) {
    ctx.err(400, error);
  }
};

const getAdsmanagment = async (ctx) => {
  try {
    const adsmanagment = await Adsmanagment.findByPk(ctx.params.id);

    if (!adsmanagment) return ctx.err(400, { friendlyMsg: "Not found adsmanagment" });

    ctx.ok(200, adsmanagment);
  } catch (error) {
    ctx.err(400, err);
  }
};

const addAdsmanagment = async (ctx) => {
  try {
    await Adsmanagment.create(ctx.request.body);
    ctx.ok(200, { message: "Succesfull add" });
  } catch (error) {
    ctx.err(400, error);
  }
};

const updateAdsmanagment = async (ctx) => {
  try {
    await Adsmanagment.update(ctx.request.body, { where: { id: ctx.params.id } });
    ctx.ok(200, { message: "Successful update" });
  } catch (error) {
    console.log(error);
    ctx.err(400, error);
  }
};
const deleteAdsmanagment = async (ctx) => {
  try {
    await Adsmanagment.destroy({ where: { id: ctx.params.id } });
    ctx.ok(200, "Successful delete");
  } catch (error) {
    ctx.err(400, error);
  }
};

module.exports = {
  getAdsmanagments,
  getAdsmanagment,
  addAdsmanagment,
  updateAdsmanagment,
  deleteAdsmanagment,
};
