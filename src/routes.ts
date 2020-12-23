import { Express } from "express";

const routes = (app: Express) => {
  app.get("/", (req, res) => {
    return res.send("tout roule ici");
  });
};

module.exports = {
  routes,
};
