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
    let svg = '
      <svg
        height="100"
        width="400"
      >
        <circle
          cx="50"
          r="50"
        />
      </svg>';
    res.send("<p>Svg stuff</p>");
    // res.json({message: "svg output goes here."});
  }
});

module.exports = router;
