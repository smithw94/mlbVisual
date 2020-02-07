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

  const outfield = [
    {x: 0, y: 100},          
    {x: 300, y: 10},                   
    {x: 600, y: 100}
  ];

  const infieldCurve = [
    {x: 170, y: 250},
    // {x: 290, y: 190},          
    {x: 300, y: 180},                   
    // {x: 310, y: 190},                   
    {x: 430, y: 250}
  ];

  const leftFoul = [
    {x: 170, y: 250}, 
    {x: 280, y: 380}
  ]          

  const rightFoul = [
    {x: 320, y: 380}, 
    {x: 430, y: 250}
  ]                
  
  const leftLine = [
    {x: 0, y: 100}, 
    {x: 250, y: 400}
  ];    

  const rightLine = [
    {x: 350, y: 400}, 
    {x: 600, y: 100}
  ];  
  
  const backStop = [
    {x: 250, y: 400}, 
    {x: 300, y: 425}, 
    {x: 350, y: 400}
  ]

  const batting =[
    {x: 280, y: 380},
    {x: 300, y: 390}, 
    {x: 320, y: 380}
  ];

  const tth = [
    {x: 230, y: 300}, 
    {x: 290, y: 370}
  ]

  const htf = [
    {x: 310, y: 370},
    {x: 370, y: 300}, 
  ]

  const tts = [
    {x: 230, y: 290},
    {x: 290, y: 240}, 
  ]

  const stf = [
    {x: 310, y: 240},
    {x: 370, y: 290}, 
  ]

  const home = [
    {x: 290, y: 370}, 
    {x: 300, y: 368}, 
    {x: 310, y: 370}
  ]

  const first = [
    {x: 370, y: 300}, 
    {x: 368, y: 295}, 
    {x: 370, y: 290}
  ]

  const second = [
    {x: 290, y: 240}, 
    {x: 300, y: 242}, 
    {x: 310, y: 240}
  ]

  const third = [
    {x: 230, y: 300}, 
    {x: 232, y: 295}, 
    {x: 230, y: 290}
  ]


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
      .attr("stroke-width", "0")
      .attr('fill', 'none')
      .transition()
      .duration(1000)
      .attr("stroke-width", "2")

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
      .attr("stroke-width", "2")
      .attr('fill', 'none')

  svg.append('path')
    .attr('d', lineFunc(leftFoul))
    .attr('stroke', 'black')
    .attr("stroke-width", "2")
    .attr('fill', 'none');

  svg.append('path')
    .attr('d', lineFunc(rightFoul))
    .attr('stroke', 'black')
    .attr("stroke-width", "2")
    .attr('fill', 'none');

  svg.append('path')
    .attr('d', curveFunc(batting))
    .attr('stroke', 'black')
    .attr("stroke-width", "1")
    .attr("stroke-width", "2")
    .attr('fill', 'none');

  svg.append('path')
    .attr('d', curveFunc(tth))
    .attr('stroke', 'black')
    .attr("stroke-width", "1")
    .attr('fill', 'none');

  svg.append('path')
    .attr('d', curveFunc(htf))
    .attr('stroke', 'black')
    .attr("stroke-width", "1")
    .attr('fill', 'none');

  svg.append('path')
    .attr('d', curveFunc(tts))
    .attr('stroke', 'black')
    .attr("stroke-width", "1")
    .attr('fill', 'none');

  svg.append('path')
    .attr('d', curveFunc(stf))
    .attr('stroke', 'black')
    .attr("stroke-width", "1")
    .attr('fill', 'none');

  svg.append("circle")
    .attr("r", 7)
    .attr("cx", "300")
    .attr("cy", "295")
    .attr('stroke', 'black')
    .attr("stroke-width", "1")
    .attr('fill', 'none');
  
  svg.append('path')
    .attr('d', curveFunc(home))
    .attr('stroke', 'black')
    .attr("stroke-width", "1")
    .attr('fill', 'none');
  
  svg.append('path')
    .attr('d', curveFunc(first))
    .attr('stroke', 'black')
    .attr("stroke-width", "1")
    .attr('fill', 'none');

  svg.append('path')
    .attr('d', curveFunc(second))
    .attr('stroke', 'black')
    .attr("stroke-width", "1")
    .attr('fill', 'none');

  svg.append('path')
    .attr('d', curveFunc(third))
    .attr('stroke', 'black')
    .attr("stroke-width", "1")
    .attr('fill', 'none');
}