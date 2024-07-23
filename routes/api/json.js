const router = require('express').Router();

const parseParams = params => {
  let error, xs;
  for (const param of params) {
    if (String(Number(param)) !== param) {
      error = `One param (${param}) cannot be parsed as a number.`;
      break;
    }
  }
  if (!error) {
    if (params.length !== 2 && params.length !== 3) {
       error = `There should be 2 or 3 params, but ${params.length} were found.`
    } else {
      let [r, nMax, nMin] = params.map(param => Number(param));
      if (r < 0 || r > 4) {
        error = `r needs to be between 0 and 4, but ${r} was found.`;
      } else if (nMax < 0 || !Number.isInteger(nMax)) {
        error = `nMax needs to be a non-negative integer, but ${nMax} was found.`;
      } else if (nMin < 0 || !Number.isInteger(nMin)) {
        error = `nMin needs to be a non-negative integer, but ${nMin} was found.`;
      }
      xs = map(r, nMax, Math.random()).slice(nMin || 0);
    }
  }
  return [error, xs];
}

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

router.get('/html', (req, res) => {
  res.json({message: "html output goes here."});
});

'/:id'
router.get('/:rNmaxNmin', (req, res) => {
  let params = req.params.rNmaxNmin.split("|");
  let [error, xs] = parseParams(params);
  // for (const param of params) {
    // if (String(Number(param)) !== param) {
      // error = `One param (${param}) cannot be parsed as a number.`;
      // break;
    // }
  // }
  // if (!error) {
    // if (params.length !== 2 && params.length !== 3) {
      //  error = `There should be 2 or 3 params, but ${params.length} were found.`
    // } else {
      // let [r, nMax, nMin] = params.map(param => Number(param));
      // if (r < 0 || r > 4) {
        // error = `r needs to be between 0 and 4, but ${r} was found.`;
      // } else if (nMax < 0 || !Number.isInteger(nMax)) {
        // error = `nMax needs to be a non-negative integer, but ${nMax} was found.`;
      // } else if (nMin < 0 || !Number.isInteger(nMin)) {
        // error = `nMin needs to be a non-negative integer, but ${nMin} was found.`;
      // }
      // xs = map(r, nMax, Math.random()).slice(nMin || 0);
    // }
  // }
  if (error) {
    res.status(500);
    res.json({error});
  } else {
    res.json({message: JSON.stringify(xs)});
  }
});

module.exports = router;
