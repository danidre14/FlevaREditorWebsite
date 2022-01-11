const express = require("express");
const router = express.Router();

router.use(async (req, res, next) => {
    res.status(404);
    // respond with html page
    if (req.accepts("html")) {
        const headerInfo = {
            title: "Page Not Found",
            desc: "No page found. The link may be broken, or the page does not exist."
        }
        let vars = { cPage: "default", headerInfo };

        res.render("error404", vars);
        return;
    }
    // respond with json
    if (req.accepts("json")) {
        res.send({ error: "Not-found" });
        return;
    }
    res.type("txt").send("Not found");
})

module.exports = router;