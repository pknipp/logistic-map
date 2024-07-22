const router = require('express').Router();
router.get("/", (req, res) => {
    res.json({message: "Instructions go here."});
  });
["json"].forEach(route => router.use(`/${route}`, require(`./${route}`)));
module.exports = router;
