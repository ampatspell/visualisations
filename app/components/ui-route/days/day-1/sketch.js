import d3 from 'npm:d3';

export default component => {
  let svg = d3.select(component.get('element')).select('svg');

  let { width, height } = svg.node().getBoundingClientRect();

  let root = svg.append('g')
    .attr('transform', () => {
      let x = width / 2;
      let y = height / 2;
      return `translate(${x}, ${y})`;
    });

  let s = d3.scaleLinear().domain([ 0, 1 ]).range([ 0, 2 * Math.PI ]);

  let line = d3.lineRadial()
    .angle(d => s(d))
    .radius(Math.min(width, height) / 3)
    .curve(d3.curveCardinal);

  let path = root.append('path').attr('class', 'line');
  let random = d3.randomUniform(0, 1);

  const update = () => {
    let data = d3.range(250).map(random);
    path.transition()
      .duration(1000)
      .attr('d', line(data));
  }

  let timer = d3.interval(() => {
    update();
  }, 1500);

  return () => {
    timer.stop();
  };
}
