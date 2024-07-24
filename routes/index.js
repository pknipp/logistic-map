const router = require('express').Router();
// router.use('/api', require('./api'));
router.get("", (req, res) => {
    res.json({message: "Instructions go here."});
});
["json", "svg"].forEach(route => router.use(`/${route}`, require(`./${route}`)));
module.exports = router;
