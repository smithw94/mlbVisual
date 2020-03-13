const displayTeams = () => {
  let testing = new Set

  const margin = { top: 20, right: 60, bottom: 45, left: 0},
  width = 300 - margin.left - margin.right,
  height = 700 - margin.top - margin.bottom;

  const svg = d3.select("#teams").append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .attr("class", "team-container")
              .append("g")
              .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")")
              

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
    .attr("width", (d, i) => {
      if (i === 24) {
        return "30%"
      } else {
        return "35%"
      }
    })
    .attr("x", function(d) {return this.parentNode.getBBox().width/3;})
    .attr("y", function(d) {return this.parentNode.getBBox().height/4;})
    .attr("class", (d, i) => `team-names-1 team ${i}`)
    .style("opacity", 0)
    .transition()
    .duration(1000)
    .attr("x", 0)
    .attr("y", -5)
    .attr("transform", (d, i) => {
      if (i < 10) {
        return "translate(0," + i * 65 + ")"
      } else if (i < 20) {
        return "translate(90," + (i - 10) * 65 + ")"
      } else {
        if (i === 24) {
          return "translate(186," + (i - 20) * 68 + ")"
        } else {
          return "translate(180," + (i - 20) * 65 + ")"
        } 
      }
    })
    .style("opacity", 1)

  let boxes = teamsEnter.append('rect')
    .attr('class', `image-border`)
    .attr('id', (d, i) => "node" + i)
    .attr('width', "30%")
    .attr('height', "65px")
    .attr("transform", (d, i) =>  {
      if (i < 10) {
        return "translate(5," + i * 65 + ")"
      } else if (i < 20) {
        return "translate(95," + (i - 10) * 65 + ")"
      } else {
        return "translate(185," + (i - 20) * 65 + ")"
      }
    })
    
  boxes.on("click", (d, i) => {
      let icon = d3.select(`#node${i}`)
      icon.classed("selected", !icon.classed("selected"))
      if (testing.has(d.key)) { // add or remove from selected team list
        testing.delete(d.key)
      } else {
        testing.add(d.key)
      }
      return displayScatter(testing); //render scatter plot with updated team list
    });
  })
}