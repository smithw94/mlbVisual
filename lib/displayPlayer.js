const displayPlayer = player => {
  d3.selectAll("#playerStat").remove();

  const margin = { top: 30, right: 50, bottom: 45, left: 20 },
  width = 200 - margin.left - margin.right,
  height = 50 - margin.top - margin.bottom;

  const color = d3.scaleOrdinal()
    .range(["#e4f9f5","#30e3ca","#11999e", "#40514e", "#35495e"]);

  const svg = d3.select("#player").append("svg")
            .attr("width", "100%")
            .attr("height", "150")
            .attr("id", "playerStat")
            .append("g")
            .attr("transform", "translate(" + 70 + "," + 100 + ")");

  player.Name = player.Name.split("\\")[0].replace(/[^a-zA-Z ]/g, ""); // remove special chars from player name
  
  const playerStats = Object.keys(player).map((key => [key, player[key]]))
  const stats = svg.selectAll("g").data(playerStats.slice(2))
  const statsEnter = stats.enter().append("g");

  statsEnter.append("text")
    .attr("x", 0)
    .attr("y", -100)
    .attr("alignment-baseline", "hanging")
    .attr("class", "player-stat")
    .style("opacity", 1)
    .attr("transform", (d, i) => "translate(" + i * 50 + ", 0)")
    .text(d => {
        if (d[0] === "Doubles") {
            return "2B";
        } else if (d[0] === "Triples") {
            return "3B";
        } else {
            return d[0];
        }
    })
    .style("font-weight", "bold")
    .transition()
    .duration(1000)
    .attr("x", 0)
    .attr("y", 20)
    .style("opacity", 1)

  statsEnter.append("text")
    .attr("x", 0)
    .attr("y", -100)
    .attr("alignment-baseline", "hanging")
    .style("opacity", 0)
    .attr("transform", (d, i) => "translate(" + i * 50 + ", 0)")
    .text(d => d[1])
    .transition()
    .duration(1000)
    .attr("x", 0)
    .attr("y", 35)
    .style("opacity", 1)
    

  statsEnter.append('rect')
    .attr("x", 0)
    .attr("y", 20)
    .attr('class', 'stat-border')
    .attr('width', function(d) { return this.parentNode.getBBox().width; })
    .attr('height', "30px")
    .attr("transform", (d, i) => "translate(" + i * 50 + ", 0)")
    .style("fill", (d, i) => {
      if (i % 2 === 1) {
        return color(i)
      }
    })
    .style("opacity", .25)

  svg.selectAll(".player-name") // name and team
      .data(Object.values(player).slice(0, 2))
      .enter().append("svg:text")
      .attr("x", 200)
      .attr("y", -100)
      .attr("class", "player-name")
      .style("opacity", 0)
      .style("text-anchor", "end")
      .attr("transform", (d, i) => "translate(" + i * 100 + ", 0)")
      .text(d => d) 
      .transition()
      .duration(1000)
      .attr("x", 200)
      .attr("y", 0)
      .style("opacity", 1)
}