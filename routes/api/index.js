const router = require('express').Router();
["json"].forEach(route => router.use(`/${route}`, require(`./${route}`)));
module.exports = router;
