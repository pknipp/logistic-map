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
    let svg = {size: {x: 1600, y: 850}, padding: {x: 70, y: 60}};
    let rect = {size: {x: svg.size.x - svg.padding.x, y: svg.size.y - 2 * svg.padding.y}};
    svg.el = "<span>This graphic is optimized for a 16-inch MacBook Pro using Chrome at mid-magnification.</span>";
    let sizes = ["small", "medium", "large"];
    let radii = [0.2, 1, 5];
    let radioButtons = sizes.map(size => (`
      <input
        type="radio"
        name="size"
        id=${size}
        value=${size}
        ${size === "medium" ? "checked" : ""}
      />
      <label for=${size}>${size}</label>
      &nbsp;
    `));
    svg.el = `
      <div>
        ${svg.el}
        &nbsp;
        <button
          type="button"
        >
          Toggle line-visibility
        </button>
        &nbsp;
        <span>
          Circle size:
        </span>
        ${radioButtons.join("")}
      </div>
    `;

    svg.el += `
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
        transform="translate(${rect.size.x / 2}, -25)"
      >
        <text
          text-anchor="middle"
          dy="0.32em"
          font-size="30"
        >
          logistics-map dynamics when growth-rate parameter = ${rFactor}
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
    let r = Math.min(rect.size.x / 2 / (1 + (n - 1) / 2 ** (rFactor < 3 ? 0 : rFactor < 3.44949 ? 1 : rFactor < 3.54409 ? 2 : 3)), rect.size.y / 20);
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
        transform = "translate(-60, ${rect.size.y / 2}) rotate(-90)"
      >
        <text
          text-anchor="middle"
          dy="0.32em"
          font-size="20"
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
          class="medium"
          cx=${x}
          cy=${y}
          r=${r * radii[1] / radii[2]}
          fill="transparent"
          stroke="black"
        />
      `;
      d += `${i ? "L" : "M"}${x},${y}`;
    });
    let path = `
      <path
        d=${d}
        stroke="black"
        fill="transparent"
        visibility="visible"
        stroke-width="0.2"
      />
    `;
    svg.el = `${svg.el}<g>${points}</g>${path}`;
    let xLabel = `
      <g
        transform = "translate(${rect.size.x / 2}, 50)"
      >
        <text
          text-anchor="middle"
          dy="0.32em"
          font-size="20"
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
    svg.el += '<p align=center><a href="https://logistic-map-ed5bb7ec94fe.herokuapp.com">Return</a> to main page.</br>';
    // `<p align=center>creator:&nbsp;<a href='https://pknipp.github.io/' target='_blank' rel='noopener noreferrer'>Peter Knipp</a><br/>repo:&nbsp;<a href='https://github.com/pknipp/eigen'target='_blank' rel='noopener noreferrer'>
    // // https://github.com/pknipp/logistic-map</a></p></body>`;

    let html = `
      <html
        xml:lang="en"
        lang="en"
        xmlns="http://www.w3.org/1999/xhtml"
      >
      <head>
      </head>
      <body>
    `;
    html += `
      ${svg.el}
      <script>
        const toggleVisibility = path => {
          let visible = path.getAttribute("visibility") === "visible";
          path.setAttribute("visibility", visible ? "hidden" : "visible");
        };
        const setRadii = (circles, newSize) => {
          let circle0 = circles[0];
          sizes = ["small", "medium", "large"];
          let currentIndex = sizes.indexOf(circle0.getAttribute("class"));
          let currentRadius = Number(circle0.getAttribute("r"));
          let radiusFactors = [0.2, 1, 5];
          let rawRadius = currentRadius / radiusFactors[currentIndex];
          let newIndex = sizes.indexOf(newSize);
          let newRadius = rawRadius * radiusFactors[newIndex];
          circles.forEach(circle => {
            circle.setAttribute("class", newSize);
            circle.setAttribute("r", newRadius);
          });
        }
        let path = document.getElementsByTagName("path")[0];
        let button = document.getElementsByTagName("button")[0];
        button.addEventListener("click", e => {
          toggleVisibility(path);
        });
        let circles = Array.from(document.getElementsByTagName("circle"));
        let inputs = Array.from(document.getElementsByTagName("input"));
        inputs.forEach(input => {
          input.addEventListener("click", e => {
            setRadii(circles, e.target.getAttribute("value"));
          });
        });
      </script>
    </body>
    </html>`;
    res.send(html);
  }
});
module.exports = router;
