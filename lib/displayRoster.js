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
  const margin = { top: 20, right: 60, bottom: 45, left: 0 },
  width = 300 - margin.left - margin.right,
  height = 700 - margin.top - margin.bottom;

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

    const roster = svg.selectAll("g")
      .data(data)
    const rosterEnter = roster.enter().append("g");
    
    // svg.selectAll(".team-name-roster")
    //   .data(team)
    //   .enter().append("text")
    //   .attr("x", 0)
    //   .attr("y", 0)
    //   .attr("class", ".team-name-roster")
    //   .text(teamName[team])


    rosterEnter.append("text")
      .attr("x", -120)
      .attr("y", 20)
      .attr("class", "player-names")
      .attr("transform", (d, i) => "translate(0," + i * 30 + ")")
      .attr("alignment-baseline", "hanging")
      .attr("text-anchor", "start")
      .style("opacity", 0)
      .text(d => d.Name.split("\\")[0].replace(/[^a-zA-Z ]/g, ""))
      .transition()
      .duration(1500)
      .attr("x", 0)
      .style("opacity", 1)
      
      

    rosterEnter.append('rect')
      .attr("x", 0)
      .attr("y", 20)
      .attr('class', 'image-border')
      .attr('width', function(d) {return this.parentNode.getBBox().width;})
      .attr('height', "15px")
      .attr("transform", (d, i) => "translate(0," + i * 30 + ")")
      .on("click", d => displayPlayer(data, d.Name));
  })
}