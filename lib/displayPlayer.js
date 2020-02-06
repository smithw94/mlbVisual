const displayPlayer = (roster, name) => {
  d3.selectAll("#playerStat").remove();

  const margin = { top: 30, right: 50, bottom: 45, left: 20 },
  width = 200 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

  const x = d3.scaleTime().range([10, width - 10]);
  const y = d3.scaleLinear().range([height, 0]); 

  const svg = d3.select("#player").append("svg")
              .attr("width", "100%")
              .attr("height", "400")
              .attr("id", "playerStat")
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  const player = roster.filter(player => player.Name === name)
  player[0].Name = player[0].Name.split("\\")[0].replace(/[^a-zA-Z ]/g, ""); // remove special chars from player name
  
  svg.selectAll(".player-key") // keys
      .data(Object.keys(player[0]).slice(2))
      .enter().append("svg:text")
      .attr("x", 45)
      .attr("y", 20)
      .attr("class", "player-key")
      .attr("transform", (d, i) => "translate(" + i * 50 + ", 0)")
      .text(d => d)

  svg.selectAll(".player-stat") // stats
      .data(Object.values(player[0]).slice(2))
      .enter().append("svg:text")
      .attr("x", 45)
      .attr("y", 40)
      .attr("class", "player-stat")
      .attr("transform", (d, i) => "translate(" + i * 50 + ", 0)")
      .text(d => d)

  svg.selectAll(".player-name") // name and team
      .data(Object.values(player[0]).slice(0, 2))
      .enter().append("svg:text")
      .attr("x", 200)
      .attr("y", 0)
      .attr("class", "player-name")
      .style("text-anchor", "end")
      .attr("transform", (d, i) => "translate(" + i * 100 + ", 0)")
      .text(d => d)  
}