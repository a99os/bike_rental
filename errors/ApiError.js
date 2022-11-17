class ApiError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  static badRequest(ctx, errorMessage) {
    return ctx.err(400, {
      message: errorMessage.message,
      friendlyMsg: errorMessage.friendlyMsg,
    });
  }
  static unathorized(ctx, errorMessage) {
    return ctx.err(401, {
      message: errorMessage.message,
      friendlyMsg: errorMessage.friendlyMsg,
    });
  }
  static forbidden(ctx, errorMessage) {
    return ctx.err(403, {
      message: errorMessage.message,
      friendlyMsg: errorMessage.friendlyMsg,
    });
  }
  static notFound(ctx, errorMessage) {
    return ctx.err(404, {
      message: errorMessage.message,
      friendlyMsg: errorMessage.friendlyMsg,
    });
  }
  static internal(ctx, errorMessage) {
    console.log(errorMessage.message);
    return ctx.err(500, {
      friendlyMsg: errorMessage.friendlyMsg,
    });
  }
}

module.exports = ApiError;
