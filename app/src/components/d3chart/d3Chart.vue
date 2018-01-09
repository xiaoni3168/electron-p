<template>
    <div id="p-d3-chart"></div>
</template>
<script>
import * as d3 from 'd3';
import _ from 'lodash';
export default {
    name: 'd3Chart',
    props: {
        height: Number,
        width: Number,
        value: String,
        datas: {
            type: Array,
            default: []
        },
        options: {
            type: Object,
            default: {}
        }
    },
    watch: {
        datas () {
            this.draw();
        }
    },
    data () {
        return {
            container: null
        }
    },
    mounted () {
        this.container = d3.select('#p-d3-chart').append('svg').attr('viewBox', '0 0 300 300').attr('height', this.height).attr('width', this.width);
    },
    methods: {
        draw () {
            let gAxis = this.container.append('g');

            this.appendAxis(gAxis);
        },
        appendAxis (parent) {
            const _t = this;
            let xAxis = parent.append('g').style('transform', 'translate(30px, 230px)'),
                yAxis = parent.append('g').style('transform', 'translate(30px, 50px)');
            
            xAxis.append('path').attr('d', 'M0.5,1V0.5H240.5V1');
            xAxis.selectAll('g')
                .data(this.datas)
                .enter()
                .append('g')
                .append('text')
                .text(d => d.name)
                .classed('x-axis-label', true)
                .each(function (d, i) {
                    d3.select(this).style('transform', `translate(${(i + 1) * ((400 * 300 / 500) / _t.datas.length) - 15}px, 7px) rotate(45deg)`)
                });
            
            yAxis.append('path').attr('d', 'M-0,180.5H0.5V0.5H-0');
            // yAxis.selectAll('g')
            //     .data()
        }
    }
}
</script>
<style lang="scss">
.x-axis-label {
    font-size: 7px;
    font-weight: bold;
}
</style>
