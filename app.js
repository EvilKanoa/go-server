const express = require("express");
const morgan = require("morgan");

module.exports = () => {
  const port = process.env.PORT || 80;
  const app = express();
  const data = { endpoints: {} };

  const loadEndpoints = () => {
    data.endpoints = require("./endpoints.json");
  };

  app.use((req, _res, next) => {
    if (req.method === "GET") {
      const endpointId =
        req.path === "/" || req.path.length === 0
          ? "/"
          : req.path.substring(1).toLowerCase();
      req.go = data.endpoints[endpointId] || {
        action: "unknown",
        error: `No endpoint found for path: ${req.path}`,
      };
    } else {
      req.go = {
        action: "unknown",
        error: "Cannot operate on non-GET requests",
      };
    }

    return next();
  });

  morgan.token("go-action", (req) => req.go.action || "unknown");
  morgan.token("go-data", (req) => JSON.stringify(req.go));
  app.use(
    morgan(
      ":remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms\n\t:go-action :go-data"
    )
  );

  app.get("*", (req, res) => {
    if (req.go.action !== "unknown") {
      if (req.go.action === "reload") {
        loadEndpoints();
        res.sendStatus(201);
      } else if (req.go.action === "static") {
        if (!req.go.file_path) {
          console.error(`No file_path found for path: ${req.path}`);
          res.sendStatus(500);
        } else {
          res.sendFile(req.go.file_path);
        }
      } else if (req.go.action === "redirect") {
        if (!req.go.redirect_url) {
          console.error(`No redirect_url found for path: ${req.path}`);
          res.sendStatus(500);
        } else {
          res.redirect(req.go.redirect_url);
        }
      } else {
        console.warn(
          `Found unsupported action for endpoint: ${req.go.action} (${req.path})`
        );
        res.sendStatus(500);
      }
    } else {
      res.sendStatus(404);
    }
  });

  loadEndpoints();
  return new Promise((resolve) => app.listen(port, () => resolve(port)));
};
