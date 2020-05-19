d3.json('./data/data.json').then((data) => {

  const WIDTH = 700;
  const HEIGHT = 700;

  let radius = 300;

  let color = d3.scaleOrdinal().range(d3.schemeSet3).domain(data.map((d) => d.team));

  let canvas = d3.select('#container').append('svg').attr('width', WIDTH).attr('height', HEIGHT);

  let group = canvas.append('g').attr('transform', 'translate(350,350)');

  let arc = d3.arc().innerRadius(120).outerRadius(radius);

  let pie = d3.pie().padAngle(0.009).sort(null).value((d) => d.sponsors);

  let theArc = group.selectAll('.arc').data(pie(data)).enter().append('g').attr('class', 'arc');

  theArc.append('path').attr('d', arc).attr('fill', (d) => color(d.data.team));

  canvas
    .append('g')
    .attr('transform', 'translate(350,350)')
    .attr('font-family', 'sans-serif')
    .attr('font-size', 12)
    .attr('text-anchor', 'middle')
    .selectAll('text')
    .data(pie(data))
    .join('text')
    .attr('transform', (d) => `translate(${arc.centroid(d)})`)
    .call((text) =>
      text.append('tspan').attr('font-weight', 'bold').text((d) => d.data.team),
    );
});
