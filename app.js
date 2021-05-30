const express = require("express");

module.exports = () => {
  const port = process.env.PORT || 80;
  const app = express();
  const data = { endpoints: {} };

  const loadEndpoints = () => {
      data.endpoints = require('./endpoints.json');
  };

  app.get((req, res) => {

  });

  return new Promise((resolve) => app.listen(port, () => resolve(port)));
};
