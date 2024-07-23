const router = require('express').Router();
const {parseParams, map} = require("./utils");

router.get('/:rNmaxNmin', (req, res) => {
  let params = req.params.rNmaxNmin.split("|");
  let [error, xs] = parseParams(params);
  if (error) {
    res.status(500);
    res.json({error});
  } else {
    let top = "<p>Svg goes below here</p>";
    let svgStart = '<svg height="400" width="600">';
    let dot = '<circle cx="500" cy="100" r="100"/>';
    res.send(`${svgStart}${dot}</svg>`);
    // res.json({message: "svg output goes here."});
  }
});

module.exports = router;
