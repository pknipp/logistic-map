const parseParams = params => {
    let error, ys;
    for (const param of params) {
        if (String(Number(param)) !== param) {
            error = `One param (${param}) cannot be parsed as a number.`;
            break;
        }
    }
    if (!error) {
        let n = params.length;
        if (n !== 2 && n !== 3 && n !== 4) {
            error = `There should be 2, 3, or 4 params, but ${n} were found.`
        } else {
            let [r, nMax, yInit, nMin] = params.map(param => Number(param));
            nMin = nMin || 0;
            if (yInit === undefined) {
                yInit = Math.random();
            }
            if (r > 4) {
              error = `r cannot exceed 4, but ${r} was found.`;
            } else if (!Number.isInteger(nMax)) {
              error = `nMax needs to be an integer, but ${nMax} was found.`;
            } else if (Number(yInit) > 1) {
                error = `Initial population ratio cannot exceed 1, but ${yInit} was found.`;
            } else if (!Number.isInteger(nMin)) {
              error = `nMin needs to be an integer, but ${nMin} was found.`;
            }
            ys = map(r, nMax, yInit).slice(nMin || 0);
        }
    }
    return [error, ys];
}

const map = (r, nMax, y) => {
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
