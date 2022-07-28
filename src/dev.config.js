import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import webpack from "webpack";
import config from "../webpack.dev.js";
import path from "path";
import DatabaseConnector from "./utils/DatabaseConnector.js";
import devMode from './utils/utils';
import dotenv from "dotenv";

export function getDevEnvConfigPathObj() {
  console.log("assigning dev")
  return { path: 'config/development.env' };
}

export function setupExpressHotUpdateMiddleware(server) {
  const compiler = webpack(config);
  server.use(
    webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: "/static",
      heartbeat: 10 * 1000,
    })
  );

  server.use(webpackHotMiddleware(compiler, {}));

  server.get("/*.hot-update.*", function (req, res) {
    res.redirect("/static" + req.originalUrl);
  });
}
