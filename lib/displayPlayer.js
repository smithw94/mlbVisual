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
  
    console.log(Object.keys(player[0]))
  svg.selectAll(".player-name") // legend
      .data(player)
      .enter().append("text")
      .attr("x", 45)
      .attr("y", 10)
      .attr("padding", 20)
      .attr("class", "player-name")
      .attr("transform", (d, i) => "translate(10," + i * 20 + ")")
      .text(d => d.Name + " " + d.Tm)

  svg.selectAll(".player-team") // legend
      .data(player)
      .enter().append("text")
      .attr("x", 45)
      .attr("y", 10)
      .attr("dy", "0em")
      .text("line 1")
      .attr("class", "player-team")
    //   .attr("transform", (d, i) => "translate(10," + i * 20 + ")")
      .text("Batting Avg")
      .append("text")
      .attr("dy", "1em")
    .text("line 2")

//   svg.selectAll(".player-stat") // legend
//       .data(player)
//       .enter().append("text")
//       .attr("x", 45)
//       .attr("y", 9)
//       .attr("padding", 20)
//       .attr("class", "player-stat")
//       .attr("transform", (d, i) => "translate(10," + i * 20 + ")")
//       .text(d => 'Hits: ' + d.H + '\n' + 'Doubles:')
}