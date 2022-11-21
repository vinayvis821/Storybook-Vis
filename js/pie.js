/*
 * Pie Chart - Object Constructor Function
 * @param _parentElement -- The HTML eleement in which to draw the visualization
 * @param _data -- the data of the story
 * @param _name -- the name of the story
 */

function PieChart(_parentElement, _data, _name) {
  this.parentElement = _parentElement;
  this.data = _data;
  this.name = _name;

  //   console.log(this.data);

  this.initVis();
}

PieChart.prototype.initVis = function () {
  let vis = this;

  vis.margin = { top: 20, right: 20, left: 20, bottom: 20 };

  vis.width = 400 - vis.margin.left - vis.margin.right;
  vis.height = 300 - vis.margin.top - vis.margin.bottom;

  vis.svg = d3
    .select("#" + vis.parentElement)
    .append("svg")
    .attr("width", vis.width + vis.margin.left + vis.margin.right)
    .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
    .append("g")
    .attr(
      "transform",
      "translate(" + vis.margin.left + "," + vis.margin.top + ")"
    );

  vis.pie = d3.pie();

  vis.updateVis(vis.data, vis.name);
};

PieChart.prototype.updateVis = function (data, name) {
  let vis = this;
  let svg = vis.svg;
  let pie = vis.pie;
  //   console.log("here");
  //   console.log(data);

  if (vis.parentElement === "pie-chart-one") {
    document.getElementById("title-1").innerHTML = name;
  } else {
    document.getElementById("title-2").innerHTML = name;
  }

  let width = vis.width;
  let height = vis.height;

  if (data.length == 0) {
    return;
  }
  let percents = calculatePercent(data);
  // console.log(percents);

  let outerRadius = width / 3;
  let innerRadius = 0;
  svg.selectAll("*").remove();
  let arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);

  let arcs = svg
    .selectAll("g.arc")
    .data(pie(percents))
    .enter()
    .append("g")
    .attr("class", "arc")
    .attr("transform", "translate(" + width / 2 + ", " + height / 2 + ")");

  arcs
    .append("path")
    .attr("fill", function (d, i) {
      // green for words they should know, red for not
      return i == 0 ? "#bbee9e" : "#ffa391";
    })
    .attr("d", arc)
    .attr("stroke", "lightgrey");

  arcs
    .append("text")
    .attr("transform", function (d) {
      return "translate(" + arc.centroid(d) + ")";
    })
    .attr("text-anchor", "middle")
    .attr("fill", "black")
    .attr("font-size", "10px")
    .text(function (d, i) {
      return i == 0
        ? "Known words " +
            (Math.round((percents[0] / (percents[0] + percents[1])) * 100) *
              100) /
              100 +
            "%"
        : "Other words " +
            (Math.round((percents[1] / (percents[0] + percents[1])) * 100) *
              100) /
              100 +
            "%";
    });
};

// Calculate percents of total words in the story that are sight words
function calculatePercent(data) {
  let count = 0;
  let words = sight;
  for (let i = 0; i < data.length; i++) {
    let word = data[i];
    if (words.includes(word)) {
      count++;
    }
  }
  percents = [count, data.length - count];
  return percents;
}
