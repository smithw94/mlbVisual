2019 MLB Data Visualization built with D3

### Background & Overview

Baseball statistics collected from over 700 players in the MLB for the 2019 season. See how a player performs when they step up to bat!

### List of Technologies and Libraries
 * D3 (v5)
 * Javascript
 
### Technical Implementation
Clicking a team's logo displays their roster for the 2019 season
![](assets/img/homeDisplay.gif)
```
teamsEnter.append("svg:image")
    .attr('xlink:href', d => `./assets/img/${d.key.toLowerCase()}.svg`)
    .attr("width", "35%")
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
        return "translate(0," + i * 65 + ")"
      } else if (i < 20) {
        return "translate(90," + (i - 10) * 65 + ")"
      } else {
        return "translate(190," + (i - 20) * 65 + ")"
      }
    })
    .style("opacity", 1)

  teamsEnter.append('rect')
    .attr('class', 'image-border')
    .attr('width', "35%")
    .attr('height', "70px")
    .attr("transform", (d, i) =>  {
      if (i < 10) {
        return "translate(0," + i * 65 + ")"
      } else if (i < 20) {
        return "translate(90," + (i - 10) * 65 + ")"
      } else {
        return "translate(180," + (i - 20) * 65 + ")"
      }
    })
    .on("click", d => displayRoster(d.key));
  })
```

See a player's breakdown by plate appearance, or see how they rank among others!
![](assets/img/pieChart.gif)
```
const g = svg.selectAll("arc")
    .data(pie)
    .enter().append("g")
    .attr("class", "arc");
  
  g.append("path")
    .attr("d", arc)
    .style("fill", d => color(d.data.hitType))
    .transition()
    .duration(1000)
    .attrTween('d', d => {
      const i = d3.interpolate(d.startAngle+0.1, d.endAngle);
      return t => {
        d.endAngle = i(t); 
        return arc(d)
        }
    }); 
```

![](assets/img/scatterPlot.gif)
```
svg.append('g')
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
        .attr("cx", function (d) { return x(0); } )
        .attr("cy", function (d) { return y(0); } )
        .style("fill", "#69b3a2")
        .transition()
        .duration(1500)
        .attr("cx", function (d) { return x(d.BA); } )
        .attr("cy", function (d) { return y(d.HR); } )
        .attr("r", 2)

    svg.append("circle")
      .data([player])
      .attr("cx", function (d) { return x(d.BA) } )
        .attr("cy", function (d) { return y(d.HR); } )
        .attr("r", 4)
        .style("fill", "red")
```



### Future Features
* Pitching statistics
