const { Usergroup } = require("../models/models");

const getUsergroups = async (ctx) => {
  try {
    const usergroup = await Usergroup.findAll();
    if (usergroup.length == 0)
      return ctx.err(400, { friendlyMsg: "Not found usergroup" });
    ctx.ok(200, usergroup);
  } catch (error) {
    ctx.err(400, error);
  }
};

const getUsergroup = async (ctx) => {
  try {
    const usergroup = await Usergroup.findByPk(ctx.params.id);

    if (!usergroup) return ctx.err(400, { friendlyMsg: "Not found usergroup" });

    ctx.ok(200, usergroup);
  } catch (error) {
    ctx.err(400, err);
  }
};

const addUsergroup = async (ctx) => {
  try {
    await Usergroup.create(ctx.request.body);
    ctx.ok(200, { message: "Succesfull add" });
  } catch (error) {
    ctx.err(400, error);
  }
};

const updateUsergroup = async (ctx) => {
  try {
    await Usergroup.update(ctx.request.body, { where: { id: ctx.params.id } });
    ctx.ok(200, { message: "Successful update" });
  } catch (error) {
    console.log(error);
    ctx.err(400, error);
  }
};
const deleteUsergroup = async (ctx) => {
  try {
    await Usergroup.destroy({ where: { id: ctx.params.id } });
    ctx.ok(200, "Successful delete");
  } catch (error) {
    ctx.err(400, error);
  }
};

module.exports = {
  getUsergroups,
  getUsergroup,
  addUsergroup,
  updateUsergroup,
  deleteUsergroup,
};
