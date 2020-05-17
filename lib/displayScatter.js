const displayScatter = teams => {
  
  d3.selectAll(".scatterPlot").remove();

  const color = d3.scaleOrdinal()
    .range(["#f67280","#c06c84","#6c5b7b", "#355c7d"]);

  const margin = {top: 10, right: 30, bottom: 40, left: 60},
    width = 500 - margin.left - margin.right,
    height = 650 - margin.top - margin.bottom;

  const svg = d3.select("#scatter").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("class", "scatterPlot")
            .append("g")
            .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")"); 
            
  let tooltip = d3.select('#scatter').append('div')
    .attr('class', 'hidden tooltip');
       
  const dataset = d3.csv("../assets/season19.csv");

  dataset.then(data => {
    svg.append("defs").append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("width", width)
      .attr("height", height);

    data = data.filter(player => teams.has(player.Tm))

    const xScale = d3.scaleLinear()
      .domain([0, .4])
      .range([10, width]);
    
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => +d.H) + 5])
      .range([height - 10, 0]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    let gX = svg.append('g')
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    let gY = svg.append('g')
      .call(yAxis);
    
    let zoom = d3.zoom()
      .scaleExtent([1, 6])
      .extent([[0, 0], [10, 10]])
      .on("zoom", zoomed);
  
    svg.append("rect")
      .attr("width", width)
      .attr("height", height)
      .style("fill", "none")
      .style("pointer-events", "all")
      .call(zoom);

    let points_g = svg.append("g")
      .attr("clip-path", "url(#clip)")
      .classed("points_g", true);


    let points = points_g.selectAll("circle").data(data)

    points = points.enter().append("circle")
      .attr('cx', function(d) {return xScale(d.BA)})
      .attr('cy', function(d) {return yScale(d.H)})
      .attr('r', 4)
      .on("click", d => displayPie(d))
      .style("fill", (d, i) => color(i))
      .on('mousemove', function (d) {
        tooltip.classed('hidden', false)
          .attr('style', 'left:' + (d3.event.clientX + 20) + 'px; top:' + (d3.event.clientY - 20) + 'px')
          .html(d.Name.split("\\")[0].replace(/[^a-zA-Z ]/g, "") + " (" +d.Tm + ")");
      })
      .on('mouseout', function () {
        tooltip.classed('hidden', true);
      });
    
    svg.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                            (height + margin.top + 25) + ")")
      .style("text-anchor", "middle")
      .text("Batting Average");

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Hits"); 

    function zoomed() {
          let new_xScale = d3.event.transform.rescaleX(xScale);
          let new_yScale = d3.event.transform.rescaleY(yScale);

          gX.call(xAxis.scale(new_xScale));
          gY.call(yAxis.scale(new_yScale));
          points.data(data)
           .attr('cx', function(d) {return new_xScale(d.BA)})
           .attr('cy', function(d) {return new_yScale(d.H)})
      }
  });
}