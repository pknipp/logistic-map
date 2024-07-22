const router = require('express').Router();

const map = (r, nMax, xInitial) => {
  let x = xInitial || Math.random();
  let n = 0;
  let xs = [x];
  while (n < nMax) {
    n++;
    x = r * x * (1 - x);
    xs.push(x);
  }
  return xs;
}

router.get('/instructions', (req, res) => {
  res.json({message: "Instructions go here."});
});

router.get('/html', (req, res) => {
  res.json({message: "html output goes here."});
});

'/:id'
router.get('/:rNmaxNmin', (req, res) => {
  let error, xs;
  let params = req.params.rNmaxNmin.split("-");
  if (!params.every(param => String(Number(param)) === param)) {
    error = "One param cannot be parsed as a number.";
  } else {
    if (params.length !== 2 && params.length !== 3) {
       error = `There should be 2 or 3 params, but ${params.length} were found.`
    } else {
      let [r, nMax, nMin] = params.map(param => Number(param));
      xs = map(r, nMax, Math.random()).slice(nMin || 0);
    }
  }
  if (error) {
    res.status(err.status || 500);
    res.json({error});
  } else {
    res.json({message: JSON.stringify(xs)});
  }
});

module.exports = router;
