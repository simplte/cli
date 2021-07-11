const Koa = require("koa");

const serve = require("koa-static");

const app = new Koa();

app.use(serve(__dirname + "/static"));

app.listen(8080, () => {
  console.log("端口：8080");
});
