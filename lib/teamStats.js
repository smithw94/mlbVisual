const teamStats = teamName => {
  d3.selectAll("#teamStats").remove();
  const margin = {top: 50, right: 50, bottom: 30, left: 50},
      width = 600 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

//Creating svg space
  const svg = d3.select(".center-div").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("id", "teamStats")
          .append("g")
            // .attr("transform","translate(" + margin.left + "," + margin.top + ")");

  // const dataset = d3.csv("../assets/teamStats.csv");

  // dataset.then(data => {
  //   data = data.filter(team => team.Tm === teamName);
  //   console.log(data);
  // })

  const outfield = [{x: 0, y: 100},          
                    {x: 300, y: 10},                   
                    {x: 600, y: 100}];

  const infieldCurve = [{x: 170, y: 250},          
                    {x: 300, y: 200},                   
                    {x: 430, y: 250}];

  const leftFoul = [{x: 170, y: 250}, {x: 280, y: 380}]                
  const rightFoul = [{x: 320, y: 380}, {x: 430, y: 250}]                
  
  const leftLine = [{x: 0, y: 100}, {x: 250, y: 400}];    
  const rightLine = [{x: 350, y: 400}, {x: 600, y: 100}];  
  
  const backStop = [{x: 250, y: 400}, {x: 300, y: 425}, {x: 350, y: 400}]

  const curveFunc = d3.line()
      .curve(d3.curveCardinal)              // This is where you define the type of curve. Try curveStep for instance.
      .x(function(d) { return d.x })
      .y(function(d) { return d.y })
      
  const lineFunc = d3.line()
      .curve(d3.curveCardinal)              // This is where you define the type of curve. Try curveStep for instance.
      .x(function(d) { return d.x })
      .y(function(d) { return d.y })

  

  svg.selectAll("arch").data(outfield).enter().append('path')
      .attr('d', curveFunc(outfield))
      .attr('stroke', 'black')
      .attr("stroke-width", "2")
      .attr('fill', 'none');

  svg.selectAll("leftLine").data(leftLine).enter().append('path')
      .attr('d', lineFunc(leftLine))
      .attr('stroke', 'black')
      .attr("stroke-width", "2")
      .attr('fill', 'none');

  svg.selectAll("rightLine").data(rightLine).enter().append('path')
      .attr('d', lineFunc(rightLine))
      .attr('stroke', 'black')
      .attr("stroke-width", "2")
      .attr('fill', 'none');

  svg.selectAll("arch").data(backStop).enter().append('path')
      .attr('d', curveFunc(backStop))
      .attr('stroke', 'black')
      .attr("stroke-width", "2")
      .attr('fill', 'none');

  svg.append('path')
      .attr('d', curveFunc(infieldCurve))
      .attr('stroke', 'black')
      .attr('fill', 'none')

  svg.append('path')
    .attr('d', lineFunc(leftFoul))
    .attr('stroke', 'black')
    .attr('fill', 'none');

  svg.append('path')
    .attr('d', lineFunc(rightFoul))
    .attr('stroke', 'black')
    .attr('fill', 'none');

  // svg.append("square").attr("r", 10).attr("cx", "300").attr("cy", "400").attr('stroke', 'black').attr("stroke-width", "2").attr('fill', 'none');
  
  
}