const { Bikecategory } = require("../models/models");

const getBikecategorys = async (ctx) => {
  try {
    const bikecategory = await Bikecategory.findAll();
    if (bikecategory.length == 0)
      return ctx.err(400, { friendlyMsg: "Not found bikecategory" });
    ctx.ok(200, bikecategory);
  } catch (error) {
    ctx.err(400, error);
  }
};

const getBikecategory = async (ctx) => {
  try {
    const bikecategory = await Bikecategory.findByPk(ctx.params.id);

    if (!bikecategory) return ctx.err(400, { friendlyMsg: "Not found bikecategory" });

    ctx.ok(200, bikecategory);
  } catch (error) {
    ctx.err(400, err);
  }
};

const addBikecategory = async (ctx) => {
  try {
    await Bikecategory.create(ctx.request.body);
    ctx.ok(200, { message: "Succesfull add" });
  } catch (error) {
    ctx.err(400, error);
  }
};

const updateBikecategory = async (ctx) => {
  try {
    await Bikecategory.update(ctx.request.body, { where: { id: ctx.params.id } });
    ctx.ok(200, { message: "Successful update" });
  } catch (error) {
    console.log(error);
    ctx.err(400, error);
  }
};
const deleteBikecategory = async (ctx) => {
  try {
    await Bikecategory.destroy({ where: { id: ctx.params.id } });
    ctx.ok(200, "Successful delete");
  } catch (error) {
    ctx.err(400, error);
  }
};

module.exports = {
  getBikecategorys,
  getBikecategory,
  addBikecategory,
  updateBikecategory,
  deleteBikecategory,
};
