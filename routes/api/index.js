const router = require('express').Router();
["", "json", "html"].forEach(route => router.use(`/${route}`, require(`./${route}`)));
module.exports = router;
