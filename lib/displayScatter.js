const displayScatter = player => {
  d3.selectAll(".scatterPlot").remove();

  var margin = {top: 10, right: 30, bottom: 30, left: 60},
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

    var x = d3.scaleLinear()
      .domain([0, 190])
      .range([ 0, width]);

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    var y = d3.scaleLinear()
      .domain([0, 210])
      .range([ height, 0]);

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
        .attr("cx", function (d) { return x(d.SO); } )
        .attr("cy", function (d) { return y(d.H); } )
        .attr("r", 1.5)
        

    svg.append("circle")
      .data([player])
      .attr("cx", function (d) { return x(d.SO) } )
        .attr("cy", function (d) { return y(d.H); } )
        .attr("r", 3)
        .style("fill", "red")
    
  });
}