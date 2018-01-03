import pHeader from './pHeader';
import pSvg from './pSvg';
import pWeather from './pWeather';

/** d3 */
import d3Pie from './d3chart/d3Pie';
import d3Chart from './d3chart/d3Chart';

const comps = [
    pHeader,
    pSvg,
    pWeather,

    /** d3 */
    d3Pie,
    d3Chart
];

export default function registComponent (Vue) {
    comps.forEach(c => {
        Vue.component(c.name, c);
    })
}