const displayTeams = () => {
  const margin = { top: 30, right: 50, bottom: 45, left: 80 },
  width = 200 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

  const x = d3.scaleTime().range([10, width - 10]);
  const y = d3.scaleLinear().range([height, 0]); 

  const svg = d3.select("#teams").append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
            .append("g")
              .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")")

  const dataset = d3.csv("../assets/season19.csv");

  dataset.then(data => {
    data = d3.nest()
      .key(d => d.Tm)
      .sortKeys(d3.ascending)
      .entries(data)
  
  
  svg.selectAll(".legend") // legend
    .data(data)
    .enter().append("text")
    .attr("x", 45)
    .attr("y", 9)
    .attr("padding", 20)
    .attr("class", "legend")
    .attr("transform", (d, i) => "translate(10," + i * 20 + ")")
    .text(d => d.key);
  })
}