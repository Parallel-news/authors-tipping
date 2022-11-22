import koa from "koa";
import path from "path";
import render from "koa-ejs";
import koaRouter from "koa-router";
import axios from "axios";
import { fileURLToPath } from "url";
import { profileOf } from "./utils/getProfile.js";

const app = new koa();
const router = new koaRouter();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;

render(app, {
  root: path.join(__dirname, "views/tipping"),
  layout: "index",
  viewExt: "ejs",
  async: true,
});

router.get("/tip/:address", async (ctx, params) => {
  const address = ctx.params?.address;
  const profile = await profileOf(address);

  return ctx.render("index", {
    profile: profile,
  });
});

app.use(router.routes()).use(router.allowedMethods());
app.listen(PORT, () => console.log(`running on port:${PORT}`));
