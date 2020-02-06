const displayTeams = () => {

  const margin = { top: 20, right: 60, bottom: 45, left: -10 },
  width = 200 - margin.left - margin.right,
  height = 800 - margin.top - margin.bottom;

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
  console.log(data);

  svg.selectAll(".team-names-1") // legend
    .data(data.slice(0, data.length / 3))
    .enter().append("svg:image")
    .attr('xlink:href', d => `./assets/img/${d.key.toLowerCase()}.svg`)
    .attr("width", "40%")
    .attr("class", "team-names-1 team")
    .attr("transform", (d, i) => "translate(10," + i * 60 + ")")
    .on("click", d => displayRoster(d.key));
  
  svg.selectAll(".team-names-2") // legend
    .data(data.slice(data.length / 3, 2*data.length / 3))
    .enter().append("svg:image")
    .attr('xlink:href', d => `./assets/img/${d.key.toLowerCase()}.svg`)
    .attr('x', '33%')
    .attr("width", "40%")
    .attr("class", "team-names-2 team")
    .attr("transform", (d, i) => "translate(10," + i * 60 + ")")
    .on("click", d => displayRoster(d.key));

  svg.selectAll(".team-names-3") // legend
    .data(data.slice(2*data.length / 3))
    .enter().append("svg:image")
    .attr('xlink:href', d => `./assets/img/${d.key.toLowerCase()}.svg`)
    .attr('x', '66%')
    .attr("width", "40%")
    .attr("class", "team-names-3 team")
    .attr("transform", (d, i) => "translate(10," + i * 60 + ")")
    .on("click", d => displayRoster(d.key));
  })
}