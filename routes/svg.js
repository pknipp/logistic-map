const router = require('express').Router();
const {parseParams, map} = require("./utils");

router.get('', (req, res) => {
  res.status(500);
  res.send(`<p>You neglected to include inputs in the url.</p>`);
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
    let rect = {size: {x: svg.size.x - svg.padding.x, y: svg.size.y - 2 * svg.padding.y}};
    svg.el = `
      <svg
        height=${svg.size.y}
        width=${svg.size.x}
      >
    `;
    svg.el += `
      <g
        transform="translate(${svg.padding.x}, ${svg.padding.y})"
      >
    `;
    let title = `
      <g
        transform="translate(${rect.size.x / 2}, -20)"
      >
        <text
          text-anchor="middle"
          dy="0.32em"
          font="40"
        >
          dynamics for growth-rate parameter = ${rFactor}
        </text>
      </g>
    `;
    svg.el += `
      ${title}
      <rect
        height=${rect.size.y}
        width=${rect.size.x}
        fill="transparent"
        stroke="black"
      />
    `;
    let n = ys.length;
    // double size of dots w/each period-doubling transition
    let r = rect.size.x / 2 / (1 + (n - 1) / 2 ** (rFactor < 3 ? 0 : rFactor < 3.44949 ? 1 : rFactor < 3.54409 ? 2 : 3));
    rect.padding = r;
    let yTicks = [];
    let nYTicks = 10;
    for (let i = 0; i <= nYTicks; i++) {
      y = rect.size.y - rect.padding - i * (rect.size.y - 2 * rect.padding) / nYTicks;
      let g = `<g transform="translate(0, ${y})">`;
      let tick = `<line x2="-10" stroke="black" />`;
      let number = `
        <text
          x="-25"
          text-anchor="middle"
          dy="0.32em"
        >
          ${i / nYTicks}
        </text>
      `;
      yTicks.push(`${g}${tick}${number}</g>`)
    }
    let yLabel = `
      <g
        transform = "translate(-55, ${rect.size.y / 2}) rotate(-90)"
      >
        <text
          text-anchor="middle"
          dy="0.32em"
        >
          x (population ratio)
        </text>
      </g>
    `;

    svg.el += `
      ${yLabel}
      <g>
        ${yTicks}
      </g>
    `;
    let xys = ys.map((y, i) => ([
      rect.padding + i * (rect.size.x - 2 * rect.padding) / (n - 1),
      rect.size.y - rect.padding - y * (rect.size.y - 2 * rect.padding),
    ]));
    let points = "";
    let d = "";
    xys.forEach(([x, y], i) => {
      points += `
        <circle
          cx=${x}
          cy=${y}
          r=${r}
          fill="transparent"
          stroke="black"
        />
      `;
      d += `${i ? "L" : "M"}${x},${y}`;
    });
    let path = '<path d=' + d + ' stroke="black" fill="transparent" />';
    svg.el = `${svg.el}<g>${points}</g>${path}`;
    let xLabel = `
      <g
        transform = "translate(${rect.size.x / 2}, 45)"
      >
        <text
          text-anchor="middle"
          dy="0.32em"
        >
          n (generations)
        </text>
      </g>
    `;
    svg.el += `<g transform = "translate(0, ${rect.size.y})">${xLabel}`;
    let nMax = 14.14 // from reverse-engineering storybook
    let dN = xys.length / nMax;
    let pow = 10 ** Math.floor(Math.log10(dN));
    dN /= pow;
    dN = dN > 5 ? 10 : dN > 2 ? 5 : 2;
    dN *= pow;
    let xTicks = [];
    xys.forEach(([x, blah], i) => {
      if (!(i % dN) && i !== xys.length - 1) {
        xTicks.push(`
          <g
            transform="translate(${x}, 0)"
          >
            <line y2="10" stroke="black" />
            <text y="25" text-anchor="middle" dy="0.32em">${i}</text>
          </g>
        `);
      }
    });
    svg.el += `${xTicks}</g></g></svg>`;
    res.send(svg.el);
  }
});

module.exports = router;
