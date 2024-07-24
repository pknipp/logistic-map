const parseParams = params => {
    let error, ys;
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
            nMin = nMin || 0;
            if (r < 0 || r > 4) {
              error = `r needs to be between 0 and 4, but ${r} was found.`;
            } else if (nMax < 0 || !Number.isInteger(nMax)) {
              error = `nMax needs to be a non-negative integer, but ${nMax} was found.`;
            } else if (nMin < 0 || !Number.isInteger(nMin)) {
              error = `nMin needs to be a non-negative integer, but ${nMin} was found.`;
            }
            ys = map(r, nMax, Math.random()).slice(nMin || 0);
        }
    }
    return [error, ys];
}

const map = (r, nMax, yInitial) => {
    let y = yInitial || Math.random();
    let n = 0;
    let ys = [y];
    while (n < nMax) {
        n++;
        y = r * y * (1 - y);
        ys.push(y);
    }
    return ys;
}

module.exports = {parseParams, map};
