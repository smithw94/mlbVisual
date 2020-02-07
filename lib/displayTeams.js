const displayTeams = () => {

  const margin = { top: 20, right: 60, bottom: 45, left: 0},
  width = 300 - margin.left - margin.right,
  height = 700 - margin.top - margin.bottom;

  const x = d3.scaleTime().range([10, width - 10]);
  const y = d3.scaleLinear().range([height, 0]); 

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

  const teams = svg.selectAll("g") // legend
    .data(data)
  
  const teamsEnter = teams.enter().append("g");

  teamsEnter.append("svg:image")
    .attr('xlink:href', d => `./assets/img/${d.key.toLowerCase()}.svg`)
    .attr("width", "30%")
    .attr("class", "team-names-1 team")
    .attr("transform", (d, i) => {
          if (i < 10) {
            return "translate(0," + i * 60 + ")"
          } else if (i < 20) {
            return "translate(75," + (i - 10) * 60 + ")"
          } else {
            return "translate(150," + (i - 20) * 60 + ")"
          }
        })

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
    .on("click", d => displayRoster(d.key));
  })
///^^^^end of csv call^^^^^
}