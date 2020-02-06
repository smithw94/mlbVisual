const displayPlayer = (roster, name) => {
  d3.selectAll("#playerStat").remove();

  const margin = { top: 30, right: 50, bottom: 45, left: 20 },
  width = 200 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

  const x = d3.scaleTime().range([10, width - 10]);
  const y = d3.scaleLinear().range([height, 0]); 

  const svg = d3.select("#player").append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .attr("id", "playerStat")
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  const player = roster.filter(player => player.Name === name)
  const playerValues = Object.values(player[0]);

  svg.selectAll(".player-name") // legend
      .data(playerValues)
      .enter().append("text")
      .attr("x", 45)
      .attr("y", 9)
      .attr("padding", 20)
      .attr("class", "player-name")
      .attr("transform", (d, i) => "translate(10," + i * 20 + ")")
      .text(d => d)
}