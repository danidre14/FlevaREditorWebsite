const express = require("express");
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.get("/:sampleName/", (req, res) => {
    const sampleName = req.params.sampleName;
    const samplePath = path.join(__dirname, "..", "sandbox-samples", sampleName);
    if (fs.existsSync(samplePath)) {
        res.sendFile(samplePath);
    } else {
        res.status(404).redirect("/");
    }
})

module.exports = router;