const { Payment } = require("../models/models");

const getPayments = async (ctx) => {
  try {
    const payment = await Payment.findAll();
    if (payment.length == 0)
      return ctx.err(400, { friendlyMsg: "Not found payment" });
    ctx.ok(200, payment);
  } catch (error) {
    ctx.err(400, error);
  }
};

const getPayment = async (ctx) => {
  try {
    const payment = await Payment.findByPk(ctx.params.id);

    if (!payment) return ctx.err(400, { friendlyMsg: "Not found payment" });

    ctx.ok(200, payment);
  } catch (error) {
    ctx.err(400, err);
  }
};

const addPayment = async (ctx) => {
  try {
    await Payment.create(ctx.request.body);
    ctx.ok(200, { message: "Succesfull add" });
  } catch (error) {
    ctx.err(400, error);
  }
};

const updatePayment = async (ctx) => {
  try {
    await Payment.update(ctx.request.body, { where: { id: ctx.params.id } });
    ctx.ok(200, { message: "Successful update" });
  } catch (error) {
    console.log(error);
    ctx.err(400, error);
  }
};
const deletePayment = async (ctx) => {
  try {
    await Payment.destroy({ where: { id: ctx.params.id } });
    ctx.ok(200, "Successful delete");
  } catch (error) {
    ctx.err(400, error);
  }
};

module.exports = {
  getPayments,
  getPayment,
  addPayment,
  updatePayment,
  deletePayment,
};
