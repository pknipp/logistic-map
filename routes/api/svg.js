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
    let svgStart = '<svg height="100" width="300">';
    let ellipse = '<ellipse cx="50" cy="150" rx="150" ry="50"/>';
    res.send(`${svgStart}${ellipse}</svg>`);
    // res.json({message: "svg output goes here."});
  }
});

module.exports = router;
