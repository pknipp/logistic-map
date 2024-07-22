const router = require('express').Router();

const map = (r, xInitial, nMax) => {
  let x = xInitial;
  let n = 0;
  let xs = [x];
  while (n < nMax) {
    n++;
    x = r * x * (1 - x);
    xs.push(x);
  }
  return xs;
}

router.get('', (req, res) => {
  res.json({message: "Instructions go here."});
});

'/:id'
router.get('/json/:rNmaxNmin', (req, res) => {
  let rNmaxNmin = rNmaxNmin.split("_");
  let [r, nMax, nMin] = rNmaxNmin.length === 3 ? rNmaxNmin : [...rNmaxNmin, 0];
  let xs = map(r, 0.5, nMax).slice(nMin);
  res.json({message: JSON.stringify(xs)});
});

router.get('/html', (req, res) => {
  res.json({message: "html output goes here."});
});
module.exports = router;
