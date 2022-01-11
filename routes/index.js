const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    const headerInfo = {
        title: "Welcome to Keebee's Catering",
        desc: "Better quality. Unbeatable prices."
    }
    let vars = { cPage: "home", headerInfo, title: "Home" };
    
    res.render("index", vars);
});

module.exports = router;