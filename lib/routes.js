"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes = (app) => {
    app.get("/", (req, res) => {
        return res.send("tout roule ici");
    });
};
module.exports = {
    routes,
};
