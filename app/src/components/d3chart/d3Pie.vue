<template>
    <div id="p-d3-pie"></div>
</template>
<script>
import * as d3 from 'd3';
import { event } from 'd3-selection';
import _ from 'lodash';
import { interpolatePath } from 'd3-interpolate-path';
export default {
    name: 'd3Pie',
    props: {
        height: Number,
        width: Number,
        value: String,
        title: [String, Number],
        unit: {
            type: String,
            default: ''
        },
        datas: {
            type: Array,
            default: []
        }
    },
    watch: {
        datas () {
            this.draw();
        }
    },
    data () {
        return {
            container: null,
            tipContainer: null,

            tip: null
        }
    },
    mounted () {
        this.container = d3.select('#p-d3-pie').append('svg').attr('viewBox', '0 0 300 300').attr('height', this.height).attr('width', this.width);
    },
    methods: {
        prepare () {
            let pie = d3.pie().value(d => d[this.value]);
            return pie(this.datas);
        },
        draw () {
            const _t = this;
            let data = this.prepare();
            let arc = d3.arc().innerRadius(40).outerRadius(100);
            let g = this.container.append('g').style('transform', 'translate(150px, 150px)');
            let colorScale = d3.scaleOrdinal().domain(d3.range(0, data.length)).range(d3.schemeCategory20c);

            g.selectAll('path')
                .data(data)
                .enter()
                .append('path')
                .attr('d', d => arc(d))
                .attr('fill', d => {
                    return colorScale(d.index);
                })
                .on('touchstart', function (d) {
                    d3.select(this).transition().style('transform', 'scale(1.1)').duration(200);
                    _t.tip = d;
                })
                .on('touchend', function (d) {
                    d3.select(this).transition().style('transform', 'scale(1)').duration(200);
                    _t.tip = null;
                });
            
            this.container.on('touchmove', this.updateTip);
            this.tipContainer = this.container.append('g');
            
            this.appendTip();
            this.appendTotal(g, data);
            this.appendTitle();
        },
        appendTotal (parent, pieData) {
            let total = _.reduce(pieData, (sum, d) => {
                return sum + d.value;
            }, 0).toFixed(2);

            parent.append('text')
                .classed('d3-pie-total', true)
                .text(`${total}${this.unit}`);
        },
        appendTitle () {
            this.container
                .append('text')
                .text(this.title)
                .classed('d3-pie-title', true);
        },
        appendTip () {
            this.tipContainer.style('display', 'none');
            this.tipContainer
                .append('rect')
                .attr('height', 60)
                .attr('width', 90)
                .attr('rx', 4)
                .attr('ry', 4)
                .classed('d3-pie-tip', true);
            this.tipContainer
                .append('text')
                .classed('tip-label-name', true);
            this.tipContainer
                .append('text')
                .classed('tip-label-number', true);
        },
        updateTip () {
            if (this.tip) {
                this.tipContainer.style('display', 'block');
                this.tipContainer
                    .select('rect')
                    .transition()
                    .duration(70)
                    .attr('x', this.coord(event, (t, l) => {
                        if ((event.touches[0].pageX + 90 * this.width / 300) > this.width) {
                            return { x: -90, y: 0 };
                        } else {
                            return { x: 0, y: 0 };
                        }
                    }).x)
                    .attr('y', this.coord(event, (t, l) => {
                        if ((event.touches[0].pageY - t + 60 * this.height / 300) > this.height) {
                            return { x: 0, y: -60 };
                        } else {
                            return { x: 0, y: 0 };
                        }
                    }).y + 35);
                this.tipContainer
                    .select('text.tip-label-name')
                    .transition()
                    .duration(70)
                    .text(this.tip.data.name)
                    .attr('x', this.coord(event, (t, l) => {
                        if ((event.touches[0].pageX + 90 * this.width / 300) > this.width) {
                            return { x: -90, y: 0 };
                        } else {
                            return { x: 0, y: 0 };
                        }
                    }).x + 5)
                    .attr('y', this.coord(event, (t, l) => {
                        if ((event.touches[0].pageY - t + 60 * this.height / 300) > this.height) {
                            return { x: 0, y: -60 };
                        } else {
                            return { x: 0, y: 0 };
                        }
                    }).y + 48);
                this.tipContainer
                    .select('text.tip-label-number')
                    .transition()
                    .duration(70)
                    .text(`${this.tip.data.number}${this.unit}`)
                    .attr('x', this.coord(event, (t, l) => {
                        if ((event.touches[0].pageX + 90 * this.width / 300) > this.width) {
                            return { x: -90, y: 0 };
                        } else {
                            return { x: 0, y: 0 };
                        }
                    }).x + 5)
                    .attr('y', this.coord(event, (t, l) => {
                        if ((event.touches[0].pageY - t + 60 * this.height / 300) > this.height) {
                            return { x: 0, y: -60 };
                        } else {
                            return { x: 0, y: 0 };
                        }
                    }).y + 58);
            } else {
                this.tipContainer.style('display', 'none');
            }
        },
        coord (e, co) {
            let offsetTop = d3.select('#p-d3-pie').node().offsetTop,
                offsetLeft = d3.select('#p-d3-pie').node().offsetLeft;
            return {
                x: e.touches[0].pageX / this.width * 300 - offsetLeft + (co ? co(offsetTop, offsetLeft).x : 0),
                y: e.touches[0].pageY / this.height * 300 - offsetTop + (co ? co(offsetTop, offsetLeft).y : 0)
            }
        }
    }
}
</script>
<style lang="scss">
@import '../../styles/color.scss';
.d3-pie-total {
    text-anchor: middle;
    dominant-baseline: middle;
    font-size: 12px;
}
.d3-pie-title {
    transform: translate(150px, 20px);
    text-anchor: middle;
    dominant-baseline: middle;
}
.d3-pie-tip {
    pointer-events: none;
    fill: $blue-grey-darken-2;
}
.tip-label-name {
    pointer-events: none;
    font-size: 7px;
    fill: #ffffff;
}
.tip-label-number {
    pointer-events: none;
    font-size: 7px;
    fill: #ffffff;
}
</style>
