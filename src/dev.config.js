import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import webpack from "webpack";
import config from "../webpack.config.js";

export function getDevEnvConfigPathObj() {
  return { path: 'config/development.env' };
}

export function setupExpressHotUpdateMiddleware(server) {
  const compiler = webpack(config);
	server.use(webpackDevMiddleware(compiler, { publicPath: '/static/build' }));
  server.use(webpackHotMiddleware(compiler, {}));

  server.get("/*.hot-update.*", function (req, res) {
    res.redirect("/static" + req.originalUrl);
  });
}
