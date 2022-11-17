const Koa = require("koa");
const config = require("config");
const bodyParser = require("koa-bodyparser");
const sequelize = require("./config/db");
const logger = require("koa-logger");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");
const app = new Koa();
const PORT = config.get("port");
const router = require("./routes/index.routes");

app.use(logger());
app.use(bodyParser());
app.use(router.routes());
app.use(errorHandler());

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("Connection has been established successfully.");
    app.listen(PORT, () => {
      console.log("Server listening on port " + PORT);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
