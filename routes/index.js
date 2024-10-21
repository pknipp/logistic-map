const router = require('express').Router();
router.get("", (req, res) => {
    // Following are used to wrap html string created for server-side rendering.
    let top = "<head><title>Logistic map</title></head><body>";
    let title = "<h3><p align=center>Logistic map: <i>x</i><sub><i>n</I>+1</sub> = <i>rx<sub>n</sub></i>(1 - <i>x<sub>n</sub></i>)</p></h3>";
    let back = '<p align=center><a href="https://pknipp.github.io/math">Return</a> to the Math APIs page.</br>';
    back += `
        creator:&nbsp;
        <a
            href='https://pknipp.github.io/'
            target='_blank' r
            el='noopener noreferrer'
        >
            Peter Knipp
        </a>
        <br/>
        repo:&nbsp;<a
            href='https://github.com/pknipp/logistic-map'
            target='_blank'
            rel='noopener
            noreferrer
        '>
            https://github.com/pknipp/logistic-map
        </a>
    </p>`;

    let background = `<p><b>Background:</b> The logistic map is a simple nonlinear difference equation that models the population of a species with the passing of each generation (or similar fixed length of time).  In the above equation <I>x</I> represents the ratio of the population to its maximum possible value, the first term (<I>rx</I>) represents reproduction, the second term (-<I>rx</I><sup>2</sup>) represents starvation, and the growth-rate parameter <i>r</I> is between 0 and 4.  Despite the equation's simplicity and depending upon the value of <i>r</I>, the solutions can be remarkably complex, giving rise to period doubling and chaos. The table below summarizes some of this.  See <a href='https://en.wikipedia.org/wiki/Logistic_map' target='_blank' rel='noopener noreferrer'>Wikipedia</a> for more information.
    <table border>
        <tr>
            <th><i>r</i><sub>min</sub></th>
            <th><i>r</i><sub>max</sub></th>
            <th>asymptotic behavior</th>
        </tr>
        <tr>
            <td>0</td>
            <td>1</td>
            <td>converges to zero</td>
        </tr>
        <tr>
            <td>1</td>
            <td>3</td>
            <td>converges to nonzero value</td>
        </tr>
        <tr>
            <td>3</td>
            <td>3.44949</td>
            <td>two cycle</td>
        </tr>
        <tr>
            <td>3.44949</td>
            <td>3.54409</td>
            <td>four cycle</td>
        </tr>
        <tr>
            <td>3.54409</td>
            <td>3.56441</td>
            <td>eight cycle</td>
        </tr>
        <tr>
            <td>3.56441</td>
            <td>3.56995</td>
            <td>more period doubling</td>
        </tr>
        <tr>
            <td>3.56995</td>
            <td>4</td>
            <td>chaos</td>
        </tr>
    </table>`;
    let instructions = "<p><b>Instructions:</b> After <tt>...herokuapp.com</tt> above you should type either <tt>/json/</tt> or <tt>/svg/</tt> depending upon whether you want the results returned numerically or graphically. After that you should type the following two to four numerical inputs separated by hyphens: <ol><li> growth-rate parameter <i>r</I></li><li> number of generations to be calculated</li><li> (optional) initial value of <i>x</i> (If omitted this will be generated randomly.)</li><li> (optional) first generation to include in the results (If omitted this will include all generations.)</li></ol>";
    let html = top + title + back + background + instructions + `
        <div>
            For instance the url https://logistic-map-ed5bb7ec94fe.herokuapp.com/svg/3.54-100-0.42 should generate a graphic of an unstable two-cycle which evolves to a stable four-cycle after about 25 generations.
        </div></body>`;
    res.send(html);
});
["json", "svg"].forEach(route => router.use(`/${route}`, require(`./${route}`)));
module.exports = router;
