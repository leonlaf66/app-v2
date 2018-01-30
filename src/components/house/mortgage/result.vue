<template>
  <svg width="180px" height="185px"></svg>
</template>

<script>
export default {
  props: ['data'],
  methods: {
    drawChartPie (dataset, monthPay) {
      var d3 = window.d3
      var ele = this.$el
      var pie = d3.layout.pie()
      var arc = d3.svg.arc()
        .innerRadius(40)
        .outerRadius(60)
      var svg = d3.select(ele)
      svg.selectAll('*').remove()
      var names = ['本金利息: $' + dataset[0].toFixed(2), '房产锐: $' + dataset[1].toFixed(2)]

      var arcs = svg.selectAll('g')
        .data(pie(dataset))
        .enter()
        .append('g')
        .attr('transform', 'translate(90, 65)')
        .attr('stroke', '#fff')
        .attr('stroke-width', 1.2)

      var colors = ['#99bd2a', '#f66c6c']

      arcs.append('path')
        .attr('fill', function (d, i) {
          return colors[i]
        })
        .attr('d', function (d) {
          return arc(d)
        })

      var legendGroup = svg.append('g')
        .attr('class', 'legend')
        .attr('transform', 'translate(15, 136)')

      var legendIems = legendGroup.selectAll('g.item')
        .data(dataset)
        .enter()
        .append('g')
        .attr('fill', function (d, i) {
          return '#777'
        })
        .attr('transform', function (d, i) {
          return 'translate(10, ' + (i * 24) + ')'
        })

      legendIems.append('rect')
        .style('width', '10px')
        .style('height', '14px')
        .style('rx', '3px')
        .style('ry', '3px')
        .style('fill', function (d, i) {
          return colors[i]
        })

      var texts = legendIems.append('text')
        .attr('x', '15')
        .attr('y', '12')

      texts.append('tspan')
        .text(function (d, i) {
          return names[i]
        })

      var mpGroup = svg.append('g')
        .attr('class', 'legend')
        .attr('transform', 'translate(90, 55)')
        .attr('text-anchor', 'middle')

      mpGroup.append('text')
        .text('月供')
        .attr('font-size', '14px')
        .attr('fill', '#777')

      mpGroup.append('text')
        .text('$' + monthPay)
        .attr('transform', 'translate(0, 24)')
        .attr('font-size', '18px')
    }
  },
  watch: {
    data (data) {
      if (data.monthPay) {
        this.drawChartPie([data.monthPay - data.tax / 12, data.tax], data.monthPay)
      }
    }
  }
}
</script>