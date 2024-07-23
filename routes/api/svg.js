const router = require('express').Router();
const {parseParams, map} = require("./utils");

router.get('/:rNmaxNmin', (req, res) => {
  let params = req.params.rNmaxNmin.split("|");
  let [error, xs] = parseParams(params);
  if (error) {
    res.status(500);
    res.json({error});
  } else {
    let svg = {size: {x: 900, y: 1600}, padding: {x: 100, y: 100}};
    let top = "<p>Svg goes below here</p>";
    let svgStart = `<svg height=${svg.size.y} width=${svg.size.x}>`;
    let dot = '<circle cx="800" cy="450" r="800"/>';
    res.send(`${svgStart}${dot}</svg>`);
    // res.json({message: "svg output goes here."});
  }
});

module.exports = router;
