const router = require('express').Router();
const {parseParams, map} = require("./utils");

router.get('/:rNmaxNmin', (req, res) => {
  let params = req.params.rNmaxNmin.split(":");
  let [error, xs] = parseParams(params);
  if (error) {
    res.status(500);
    res.json({error});
  } else {
    let svg = {size: {x: 1600, y: 900}, padding: {x: 100, y: 100}};
    let rect = {size: {x: svg.size.x - 2 * svg.padding.x, y: svg.size.y - 2 * svg.padding.y}};
    svg.el = `<svg height=${svg.size.y} width=${svg.size.x}>`;
    svg.el = `${svg.el}<g transform="translate(${svg.padding.x}, ${svg.padding.y})">`;
    svg.el = `${svg.el}<rect height=${rect.size.y} width=${rect.size.x} fill="transparent" stroke="black" />`;

    svg.el = `${svg.el}</g></svg>`;
    // let dot = '<circle cx="800" cy="450" r="800"/>';
    res.send(svg.el);
  }
});

module.exports = router;
