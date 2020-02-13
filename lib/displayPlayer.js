const displayPlayer = (roster, name) => {
  d3.selectAll("#playerStat").remove();

  const margin = { top: 30, right: 50, bottom: 45, left: 20 },
  width = 200 - margin.left - margin.right,
  height = 50 - margin.top - margin.bottom;

  const svg = d3.select("#player").append("svg")
            .attr("width", "100%")
            .attr("height", "150")
            .attr("id", "playerStat")
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  const player = roster.filter(player => player.Name === name)
  // displayScatter(player[0]); // trigger scatterPlot

  player[0].Name = player[0].Name.split("\\")[0].replace(/[^a-zA-Z ]/g, ""); // remove special chars from player name
  
  const playerStats = Object.keys(player[0]).map((key => [key, player[0][key]]))

  const stats = svg.selectAll("g").data(playerStats.slice(2))
  const statsEnter = stats.enter().append("g");


  statsEnter.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("alignment-baseline", "hanging")
    .attr("class", "player-stat")
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
    .style("font-weight", "bold");

  statsEnter.append("text")
    .attr("x", 0)
    .attr("y", 35)
    .attr("alignment-baseline", "hanging")
    .attr("transform", (d, i) => "translate(" + i * 50 + ", 0)")
    .text(d => d[1])

  statsEnter.append('rect')
    .attr("x", 0)
    .attr("y", 20)
    .attr('class', 'stat-border')
    .attr('width', function(d) {return this.parentNode.getBBox().width;})
    .attr('width', function(d) {return this.parentNode.getBBox().height;})
    .attr('height', "30px")
    .attr("transform", (d, i) => "translate(" + i * 50 + ", 0)")
    .style("fill", (d, i) => {
      if (i % 2 === 1) {
        return "#69b3a2"
      }
    })
    .style("opacity", .25)

  svg.selectAll(".player-name") // name and team
      .data(Object.values(player[0]).slice(0, 2))
      .enter().append("svg:text")
      .attr("x", 200)
      .attr("y", 0)
      .attr("class", "player-name")
      .style("text-anchor", "end")
      .attr("transform", (d, i) => "translate(" + i * 100 + ", 0)")
      .text(d => d)  

    displayPie(player[0]);
}