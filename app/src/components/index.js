/** d3 */
import d3Pie from './d3chart/d3Pie';
import d3Chart from './d3chart/d3Chart';

import RMB from './rmb/RMB';

const comps = [
    /** d3 */
    d3Pie,
    d3Chart,

    RMB
];

export default function registComponent (Vue) {
    comps.forEach(c => {
        Vue.component(c.name, c);
    })
}