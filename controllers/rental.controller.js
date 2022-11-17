const { Rental } = require("../models/models");

const getRentals = async (ctx) => {
  try {
    const rental = await Rental.findAll();
    if (rental.length == 0)
      return ctx.err(400, { friendlyMsg: "Not found rental" });
    ctx.ok(200, rental);
  } catch (error) {
    ctx.err(400, error);
  }
};

const getRental = async (ctx) => {
  try {
    const rental = await Rental.findByPk(ctx.params.id);

    if (!rental) return ctx.err(400, { friendlyMsg: "Not found rental" });

    ctx.ok(200, rental);
  } catch (error) {
    ctx.err(400, err);
  }
};

const addRental = async (ctx) => {
  try {
    await Rental.create(ctx.request.body);
    ctx.ok(200, { message: "Succesfull add" });
  } catch (error) {
    ctx.err(400, error);
  }
};

const updateRental = async (ctx) => {
  try {
    await Rental.update(ctx.request.body, { where: { id: ctx.params.id } });
    ctx.ok(200, { message: "Successful update" });
  } catch (error) {
    console.log(error);
    ctx.err(400, error);
  }
};
const deleteRental = async (ctx) => {
  try {
    await Rental.destroy({ where: { id: ctx.params.id } });
    ctx.ok(200, "Successful delete");
  } catch (error) {
    ctx.err(400, error);
  }
};

module.exports = {
  getRentals,
  getRental,
  addRental,
  updateRental,
  deleteRental,
};
