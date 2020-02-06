const displayTeams = () => {
  const teamName = {
    'ARI': 'Arizona Diamondbacks',
    'ATL': 'Atlanta Braves',
    'BAL': 'Baltimore Orioles',
    'BOS': 'Boston Red Sox',
    'CHC': 'Chicago Cubs',
    'CHW': 'Chicago White Sox',
    'CIN': 'Cincinati Reds',
    'CLE': 'Clevland Braves',
    'COL': 'Colorado Rockies',
    'DET': 'Detroit Tigers',
    'HOU': 'Houston Astros',
    'KCR': 'Kansas City Royals',
    'LAA': 'Los Angeles Angels',
    'LAD': 'Los Angeles Dodgers',
    'MIA': 'Miami Marlins',
    'MIL': 'Milwaukee Brewers',
    'MIN': 'Ministota Twins',
    'NYM': 'New York Mets',
    'NYY': 'New York Yankees',
    'OAK': 'Oakland Atheletics',
    'PHI': 'Philedelphia Phillies',
    'PIT': 'Pittsburg Pirates',
    'SDP': 'San Diego Padres'
  }

  const margin = { top: 20, right: 60, bottom: 45, left: -10 },
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

  svg.selectAll(".team-names") // legend
    .data(data)
    .enter().append("text")
    .attr("x", 45)
    .attr("y", 9)
    .attr("padding", 20)
    .attr("class", "team-names")
    .attr("transform", (d, i) => "translate(10," + i * 20 + ")")
    .text(d => teamName[d.key])
    .on("click", d => displayRoster(d.key));
  })
}