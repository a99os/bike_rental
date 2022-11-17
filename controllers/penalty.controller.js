const { Penalty } = require("../models/models");

const getPenaltys = async (ctx) => {
  try {
    const penalty = await Penalty.findAll();
    if (penalty.length == 0)
      return ctx.err(400, { friendlyMsg: "Not found penalty" });
    ctx.ok(200, penalty);
  } catch (error) {
    ctx.err(400, error);
  }
};

const getPenalty = async (ctx) => {
  try {
    const penalty = await Penalty.findByPk(ctx.params.id);

    if (!penalty) return ctx.err(400, { friendlyMsg: "Not found penalty" });

    ctx.ok(200, penalty);
  } catch (error) {
    ctx.err(400, err);
  }
};

const addPenalty = async (ctx) => {
  try {
    await Penalty.create(ctx.request.body);
    ctx.ok(200, { message: "Succesfull add" });
  } catch (error) {
    ctx.err(400, error);
  }
};

const updatePenalty = async (ctx) => {
  try {
    await Penalty.update(ctx.request.body, { where: { id: ctx.params.id } });
    ctx.ok(200, { message: "Successful update" });
  } catch (error) {
    console.log(error);
    ctx.err(400, error);
  }
};
const deletePenalty = async (ctx) => {
  try {
    await Penalty.destroy({ where: { id: ctx.params.id } });
    ctx.ok(200, "Successful delete");
  } catch (error) {
    ctx.err(400, error);
  }
};

module.exports = {
  getPenaltys,
  getPenalty,
  addPenalty,
  updatePenalty,
  deletePenalty,
};
