import d3 from 'npm:d3';

export default component => {
  let svg = d3.select(component.get('element')).select('svg');

  let { width, height } = svg.node().getBoundingClientRect();

  let root = svg.append('g')
    .attr('transform', () => {
      let x = width / 2 - 50;
      let y = height / 2;
      return `translate(${x}, ${y})`;
    });

  let s = d3.scaleLinear().domain([ 0, 1 ]).range([ 0, 2 * Math.PI ]);

  let line = d3.lineRadial()
    .angle(d => s(d))
    .radius(200)
    .curve(d3.curveCardinal);

  let r = d3.randomUniform(0, 1);

  const update = () => {
    let data = d3.range(200).map(() => r());
    let path = root.selectAll('path').data([ data ]);

    path.enter()
      .append('path')
      .attr('class', 'line');

    path.exit()
      .remove();

    path.transition()
      .duration(1000)
      .attr('d', line);
  }

  let timer = d3.interval(() => {
    update();
  }, 1500);

  return () => {
    timer.stop();
  };
}
