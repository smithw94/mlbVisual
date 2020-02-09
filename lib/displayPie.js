const displayPie = player => {

   d3.selectAll(".pieChart").remove();
  
  var width = 500,
    height = 500,
    // Think back to 5th grade. Radius is 1/2 of the diameter. What is the limiting factor on the diameter? Width or height, whichever is smaller
    radius = Math.min(width, height) / 3;


  var color = d3.scaleOrdinal()
    .range(["#2C93E8","#838690","#F56C4E", "green"]);
  

  // console.log(player);
   const pieData =     [
      {"hitType": "singles", "count": player.H - player.Doubles - player.Triples - player.HR},
      {"hitType": "doubles", "count": +player.Doubles},
      {"hitType": "triples", "count": +player.Triples},
      {"hitType": "homeRuns", "count": +player.HR},
    ]
    
  var pie = d3.pie()
    .value(function(d) { return d.count; })(pieData);

  var arc = d3.arc()
    .outerRadius(radius - 50)
    .innerRadius(0);
  
  var labelArc = d3.arc()
    .outerRadius(radius - 70)
    .innerRadius(radius - 70);

  var svg = d3.select("#field")
    .append("svg")
    .attr("width", width)
    .attr("class", "pieChart")
    .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width/2 + "," + height/2 +")"); // Moving the center point. 1/2 the width and 1/2 the height
  
  var g = svg.selectAll("arc")
    .data(pie)
    .enter().append("g")
    .attr("class", "arc");
  
  g.append("path")
    .attr("d", arc)
    .style("fill", function(d) { return color(d.data.hitType)});

  const lineFunc = d3.line()
    .x(function(d) { return d.x })
    .y(function(d) { return d.y })
  
  g.append('path')
    .attr('d', d => {
      
      let startX = labelArc.centroid(d)[0],
          startY = labelArc.centroid(d)[1];
      
      let midX = startX * 3/2;
      let midY = startY * 3/2;

      let endX;
      let endY = midY;

      if (midX > 0) {
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
    .attr("stroke-width", d => d.value > 0 ? "1" : "0")
    .attr('fill', 'none');

  g.append("text")
    .attr("transform", d => { 
      let x = labelArc.centroid(d)[0] * 3/2
      let y = labelArc.centroid(d)[1] * 3/2 - 5

      if (d.data.hitType === "singles") {
        x += 50
      }
      return "translate(" + x + "," + y + ")"; 
    })
    .text(d => { 
      let word = d.data.hitType[0].toUpperCase() + d.data.hitType.slice(1);
      if (word === "HomeRuns") {
        word = "Home Runs";
      }
      return word;
    })
    .attr("text-anchor", "end")
    .style("fill", d => d.value > 0 ? "black" : "none");
}