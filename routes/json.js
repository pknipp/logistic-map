const router = require('express').Router();
const {parseParams, map} = require("./utils");

router.get('', (req, res) => {
  res.status(500);
  res.json({error: "You neglected to include inputs in the url."});
});

router.get('/:rNmaxNmin', (req, res) => {
  let params = req.params.rNmaxNmin.split("-");
  let [error, xs] = parseParams(params);
  if (error) {
    res.status(500);
    res.json({error});
  } else {
    res.json({message: JSON.stringify(xs)});
  }
});

module.exports = router;
