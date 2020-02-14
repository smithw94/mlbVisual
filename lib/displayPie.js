const displayPie = player => {
   d3.selectAll(".pieChart").remove();

  const width = 500,
    height = 475,
    radius = Math.min(width - 20, height) / 3

  const color = d3.scaleOrdinal()
    .range(["#2C93E8","yellow","#F56C4E", "green", "purple"]);

  let pieData = [
    {"hitType": "single", "count": player.H - player.Doubles - player.Triples - player.HR},
    {"hitType": "double", "count": +player.Doubles},
    {"hitType": "triple", "count": +player.Triples},
    {"hitType": "homeRun", "count": +player.HR},
    {"hitType": "Strikeout", "count": +player.SO},
  ]

  pieData = pieData.filter(stat => stat.count != 0); // remove zero values
  pieData.sort((a, b) => b.count - a.count)
  const pie = d3.pie()
    .value(d => d.count)(pieData)
    
  const arc = d3.arc()
    .outerRadius(radius - 50)
    .innerRadius(100);
  
  const labelArc = d3.arc()
    .outerRadius(radius - 50)
    .innerRadius(radius - 50);

  // const svg = d3.select("#field")
  //   .append("svg")
  //   .attr("width", width)
  //   .attr("height", height)
  //   .attr("class", "pieChart")
  //     .append("g")
  //     .attr("transform", "translate(" + width/2 + "," + height/2 +")") // Moving the center point. 1/2 the width and 1/2 the height
  
  const svg = d3.select("#field")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "pieChart")
      .append("g")
      .attr("transform", "translate(" + width/2 + "," + height/2 +")") // Moving the center point. 1/2 the width and 1/2 the height
      .style("opacity", 0)

    svg.transition()
      .duration(1000)
      .style("opacity", 1)
  
  const g = svg.selectAll("arc")
    .data(pie)
    .enter().append("g")
    .attr("class", "arc");
  
  g.append("path")
    .attr("d", arc)
    .style("fill", d => color(d.data.hitType))
    .transition()
    .duration(1500)
    .attrTween('d', d => {
      const i = d3.interpolate(d.startAngle+0.1, d.endAngle);
      return t => {
        d.endAngle = i(t); 
        return arc(d)
        }
    }); 
    
  const lineFunc = d3.line() // pie chart line function
    .x(d => d.x)
    .y(d => d.y)
  
  const lines = g.append('path')    // pie chart lines
    .attr('d', (d, i) => {
      
      let startX = labelArc.centroid(d)[0],
          startY = labelArc.centroid(d)[1];
      
      let midX = startX * 4/3;
      let midY = startY * 4/3;

      let endX;
      let endY = midY;

      if (midX > 0 || i === pieData.length - 1) {
        endX = midX + 50;
      } else {
        endX = midX - 50;
      }

      let annotation = [
        {x: startX, y: startY}, 
        {x: midX, y: midY},
        {x: endX, y: endY}
      ]
      return lineFunc(annotation);
    })
    .attr('stroke', 'black')
    .attr("stroke-width", "1")
    .attr('fill', 'none');

    const pathLength = lines.node().getTotalLength();
    const transitionPath = d3
          .transition()
          .ease(d3.easeLinear)
          .duration(1500);
    lines
      .attr("stroke-dashoffset", pathLength)
      .attr("stroke-dasharray", pathLength)
      .transition(transitionPath)
      .attr("stroke-dashoffset", 0);

  g.append("text")  // pie chart labels 
    .attr("transform", d => { 
      let x = labelArc.centroid(d)[0] * 4/3
      let y = labelArc.centroid(d)[1] * 4/3 - 5
      if (d.data.hitType === "singles") {
        x += 50
      }
      return "translate(" + x + "," + y + ")"; 
    })
    .text(d => { 
      let word = d.data.hitType[0].toUpperCase() + d.data.hitType.slice(1);
      if (word === "HomeRun") {
        word = "Home Run";
      }
      return word + ` (${d.data.count})`;
    })
    .attr("opacity", "0")
    .attr("text-anchor", (d, i) => {
      if (labelArc.centroid(d)[0] > 0 || i === pieData.length - 1) {
        return "start";
      } else {
        return "end";
      }
    })
    .style("fill", "black")
    .transition()
    .duration(1500)
    .attr("opacity", "1")

  svg.append("svg:image")
    .data([player])
    .attr('xlink:href', d => `./assets/img/${d.Tm.toLowerCase()}.svg`)
    .attr("transform", "translate(-75, -55)")
    .attr("width", "120%")
    .attr("width", "30%")

  displayPlayer(player);
}