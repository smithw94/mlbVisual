const displayPie = player => {

   d3.selectAll(".pieChart").remove();
  
  var width = 300,
    height = 300,
    // Think back to 5th grade. Radius is 1/2 of the diameter. What is the limiting factor on the diameter? Width or height, whichever is smaller
    radius = Math.min(width, height) / 2;


  var color = d3.scaleOrdinal()
    .range(["#2C93E8","#838690","#F56C4E", "green"]);
  

  // console.log(player);
   const pieData =     [
      {"hitType": "singles", "count": player.H - player.Doubles - player.Triples - player.HR},
      {"hitType": "doubles", "count": +player.Doubles},
      {"hitType": "triples", "count": +player.Triples},
      {"hitType": "homeRuns", "count": +player.HR},
    ]

  console.log(pieData);
    
  var pie = d3.pie()
    .value(function(d) { return d.count; })(pieData);

  var arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);
  
  var labelArc = d3.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

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

  g.append("text")
    .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
    .text(function(d) { return d.data.hitType;})
    .style("fill", "#fff");
  // pie chart 
  /*

        Singles    | Doubles|_
        -----------|----------|              
        Home Runs  | Triples|


    [
      {"hitType": "singles", "count": player.H - player.Doubles - player.Triples - player.HR}
      {"hitType": "doubles", "count": player.2B},
      {"hitType": "triples", "count": player.3B},
      {"hitType": "homeRuns", "count": player.HR},
    ]

  */



}