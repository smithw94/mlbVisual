const displayScatter = player => {
  d3.selectAll(".scatterPlot").remove();

  const margin = {top: 10, right: 30, bottom: 40, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
   

  const svg = d3.select("#scatter").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("class", "scatterPlot")
            .append("g")
            .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")")

  const dataset = d3.csv("../assets/season19.csv");

  dataset.then(data => {
    
    const x = d3.scaleLinear()
      .domain([0, .4])
      .range([0, width]);
    
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    const y = d3.scaleLinear()
      .domain([0, 56])
      .range([height, 0]);

    svg.append("g")
      .call(d3.axisLeft(y));

    svg.append('g')
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
        .attr("cx", function (d) { return x(0); } )
        .attr("cy", function (d) { return y(0); } )
        .style("fill", "#69b3a2")
        .transition()
        .duration(1500)
        .attr("cx", function (d) { return x(d.BA); } )
        .attr("cy", function (d) { return y(d.HR); } )
        .attr("r", 2)

    svg.append("circle")
      .data([player])
      .attr("cx", function (d) { return x(d.BA) } )
        .attr("cy", function (d) { return y(d.HR); } )
        .attr("r", 4)
        .style("fill", "red")
    
    svg.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                            (height + margin.top + 20) + ")")
      .style("text-anchor", "middle")
      .text("Batting Average");

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Home Runs"); 
  });
}