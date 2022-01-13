const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    const createLink = process.env.NODE_ENV !== "production" ? "#create" : "https://editor.flevar.com/";
    let vars = { cPage: "home", title: "Home", dLinks: { create: createLink } };

    res.render("index", vars);
});

module.exports = router;