const router = require('express').Router();
const {parseParams, map} = require("./utils");

router.get('', (req, res) => {
  res.status(500);
  res.json(`<p>"You neglected to include inputs in the url."</p>`);
});

router.get('/:rNmaxNmin', (req, res) => {
  let params = req.params.rNmaxNmin.split("-");
  let rFactor = Number(params[0]);
  let [error, ys] = parseParams(params);
  if (error) {
    res.status(500);
    res.send(`<p>${error}</p>`);
  } else {
    let svg = {size: {x: 1600, y: 900}, padding: {x: 100, y: 100}};
    let rect = {size: {x: svg.size.x - 2 * svg.padding.x, y: svg.size.y - 2 * svg.padding.y}};
    svg.el = `<svg height=${svg.size.y} width=${svg.size.x}>`;
    svg.el = `${svg.el}<g transform="translate(${svg.padding.x}, ${svg.padding.y})">`;
    svg.el = `${svg.el}<rect height=${rect.size.y} width=${rect.size.x} fill="transparent" stroke="black" />`;
    let n = ys.length;
    // double size of dots w/each period-doubling transition
    let r = rect.size.x / 2 / (1 + (n - 1) / 2 ** (rFactor < 3 ? 0 : rFactor < 3.44949 ? 1 : rFactor < 3.54409 ? 2 : 3));
    rect.padding = r;
    let xys = ys.map((y, i) => ([
      rect.padding + i * (rect.size.x - 2 * rect.padding) / (n - 1),
      rect.size.y - rect.padding - y * (rect.size.y - 2 * rect.padding),
    ]));
    let points = "";
    let d = "";
    xys.forEach(([x, y], i) => {
      points += `<circle cx=${x} cy=${y} r=${r} fill="transparent" stroke="black" />`;
      d += `${i ? "L" : "M"}${x},${y}`;
    });
    let path = '<path d=' + d + ' stroke="black" fill="transparent" />';
    svg.el = `${svg.el}<g>${points}</g>${path}</svg>`;
    res.send(svg.el);
  }
});

module.exports = router;
