const displayRoster = team => {
  const teamName = {
    'ARI': 'Arizona Diamondbacks',
    'ATL': 'Atlanta Braves',
    'BAL': 'Baltimore Orioles',
    'BOS': 'Boston Red Sox',
    'CHC': 'Chicago Cubs',
    'CHW': 'Chicago White Sox',
    'CIN': 'Cincinnati Reds',
    'CLE': 'Cleveland Indians',
    'COL': 'Colorado Rockies',
    'DET': 'Detroit Tigers',
    'HOU': 'Houston Astros',
    'KCR': 'Kansas City Royals',
    'LAA': 'Los Angeles Angels',
    'LAD': 'Los Angeles Dodgers',
    'MIA': 'Miami Marlins',
    'MIL': 'Milwaukee Brewers',
    'MIN': 'Minnesota Twins',
    'NYM': 'New York Mets',
    'NYY': 'New York Yankees',
    'OAK': 'Oakland Atheletics',
    'PHI': 'Philedelphia Phillies',
    'PIT': 'Pittsburg Pirates',
    'SDP': 'San Diego Padres',
    'SFG': 'San Francisco Giants'
  }

  d3.selectAll("#rosterList").remove();
  const margin = { top: 30, right: 50, bottom: 45, left: 20 },
  width = 200 - margin.left - margin.right,
  height = 800 - margin.top - margin.bottom;

  const x = d3.scaleTime().range([10, width - 10]);
  const y = d3.scaleLinear().range([height, 0]); 

  const svg = d3.select("#roster").append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .attr("id", "rosterList")
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  const dataset = d3.csv("../assets/season19.csv");

  dataset.then(data => {
    data = data.filter(player => {
      return player.Tm === team
    })
    console.log(data);

    svg.selectAll(".team-name-roster")
      .data(team)
      .enter().append("text")
      .attr("x", 0)
      .attr("y", 0)
      .attr("class", ".team-name-roster")
      .text(teamName[team])

    svg.selectAll(".player-names") // legend
      .data(data)
      .enter().append("text")
      .attr("x", 0)
      .attr("y", 20)
      .attr("class", "player-names")
      .attr("transform", (d, i) => "translate(0," + i * 20 + ")")
      .text(d => d.Name.split("\\")[0].replace(/[^a-zA-Z ]/g, ""))
      .on("click", d => displayPlayer(data, d.Name));
  })
}