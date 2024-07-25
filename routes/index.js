const router = require('express').Router();
router.get("", (req, res) => {
    // Following are used to wrap html string created for server-side rendering.
    let top = "<head><title>Logistic map</title></head><body>";
    let title = "<h3><p align=center>Logistic map: <i>x</i><sub><i>n</I>+1</sub> = <i>rx<sub>n</sub></i>(1 - <i>x<sub>n</sub></i>)</p></h3>";
    let back = '<p align=center><a href="https://pknipp.github.io/math">Return</a> to the Math APIs page.<ul>';
    let bottom = "<p align=center>creator:&nbsp;<a href='https://pknipp.github.io/' target='_blank' rel='noopener noreferrer'>Peter Knipp</a></p></body>";
    let background = "<p>Background: The <a href='https://en.wikipedia.org/wiki/Logistic_map' target='_blank' rel='noopener noreferrer'>logistics map</a> is a simple nonlinear difference equation that models the population of a species with each passing generation (or similar fixed length of time).  Here <I>x</I> represents the maximum possible population, the first term (<I>rx</I>) represents reproduction, the second term (-<I>rx</I><sup>2</sup>) represents starvation, and the parameter <i>r</I> is between 0 and 4.  Despite this equation's simplicity and depending upon the value of <i>r</I>, the solutions can be remarkably complex, giving rise to period doubling and chaos. See the linked Wikipedia article for more information."
    let instructions = "<p>Instructions: After <tt>...herokuapp.com</tt> above you should type either <tt>/json/</tt> or <tt>/svg/</tt> depending upon whether you want the results returned numerically or graphically. After that you should type the following two to four numerical inputs separated by hyphens: <ol><li> parameter <i>r</I></li><li> number of generations to be calculated</li><li> (optional) initial value of <i>x</i> (If omitted this will be generated randomly.)</li><li> (optional) first generation to include in the results (If omitted this will include all generations.)</li></ol>";
    let html = top + title + back + background + instructions + bottom;
    res.send(html);
});
["json", "svg"].forEach(route => router.use(`/${route}`, require(`./${route}`)));
module.exports = router;
