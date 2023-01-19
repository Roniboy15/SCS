const express = require("express")
const router = express.Router();
const path = require("path")


router.get('/', (req, res) => {
    try {
        const fileDirectory = path.resolve('public');

        res.sendFile('documentation.html', { root: fileDirectory });
    }
    catch (err) {
        res.status(404).json({ msg: "files doesnt exist" })
    }
});

module.exports = router;