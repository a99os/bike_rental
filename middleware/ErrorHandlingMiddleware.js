const ApiError = require("../errors/ApiError");

module.exports = () =>
  function (err, ctx, next) {
    if (err instanceof ApiError) {
      ctx.status = err.status;
      return (ctx.body = { message: err.message });
    }
    if (err.message.includes("Unexpected token")) {
      ctx.status = err.status;
      return (ctx.body = { message: err.message });
    }
    ctx.status = err.status;
    return (ctx.body = { message: "Nazarda tutilmagan xatolik" });
  };
