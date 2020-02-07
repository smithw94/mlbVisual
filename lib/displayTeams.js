const displayTeams = () => {

  const margin = { top: 20, right: 60, bottom: 45, left: 0},
  width = 300 - margin.left - margin.right,
  height = 700 - margin.top - margin.bottom;

  const svg = d3.select("#teams").append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")")
              .attr("class", "team-container")

  const dataset = d3.csv("../assets/season19.csv");

  dataset.then(data => {
    data = d3.nest()
      .key(d => d.Tm)
      .sortKeys(d3.ascending)
      .entries(data)
  
  data.shift();
  data = data.filter(team => team.key !== 'TOT')

  const teams = svg.selectAll("g")
    .data(data)
  const teamsEnter = teams.enter().append("g");
  
  teamsEnter.append("svg:image")
    .attr('xlink:href', d => `./assets/img/mlb.svg`)
    .attr("width", "100%")
    .attr("x", "0")
    .attr("y", function(d) {return this.parentNode.getBBox().height/4;})
    .transition()
    .duration(1000)
    .style("opacity", 0)
    .remove()

  teamsEnter.append("svg:image")
    .attr('xlink:href', d => `./assets/img/${d.key.toLowerCase()}.svg`)
    .attr("width", "30%")
    .attr("x", function(d) {return this.parentNode.getBBox().width/3;})
    .attr("y", function(d) {return this.parentNode.getBBox().height/4;})
    .attr("class", "team-names-1 team")
    .style("opacity", 0)
    .transition()
    .duration(1000)
    .attr("x", 0)
    .attr("y", 0)
    .attr("transform", (d, i) => {
      if (i < 10) {
        return "translate(0," + i * 60 + ")"
      } else if (i < 20) {
        return "translate(75," + (i - 10) * 60 + ")"
      } else {
        return "translate(150," + (i - 20) * 60 + ")"
      }
    })
    .style("opacity", 1)

  teamsEnter.append('rect')
    .attr('class', 'image-border')
    .attr('width', "30%")
    .attr('height', "60px")
    .attr("transform", (d, i) =>  {
      if (i < 10) {
        return "translate(0," + i * 60 + ")"
      } else if (i < 20) {
        return "translate(75," + (i - 10) * 60 + ")"
      } else {
        return "translate(150," + (i - 20) * 60 + ")"
      }
    })
    .on("click", d => teamStats(d.key));
  })

///^^^^end of csv call^^^^^
}