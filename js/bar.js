/*
 * Bar Chart - Object Constructor Function
 * @param _parentElement -- The HTML eleement in which to draw the visualization
 */

function BarChart(_parentElement) {
  this.parentElement = _parentElement;

  //   console.log(this.data);

  this.initVis();
}

BarChart.prototype.initVis = function () {
  let vis = this;

  vis.margin = { top: 20, right: 20, left: 20, bottom: 20 };

  vis.width = 500 - vis.margin.left - vis.margin.right;
  vis.height = 400 - vis.margin.bottom - vis.margin.top;

  vis.svg = d3
    .select("#" + vis.parentElement)
    .append("svg")
    .attr("width", vis.width + vis.margin.left + vis.margin.right)
    .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
    .append("g")
    .attr(
      "transform",
      "translate(" + vis.margin.left * 2.2 + "," + vis.margin.top + ")"
    );

  // Scales

  vis.xScale = d3.scaleBand().rangeRound([0, vis.width]).paddingInner(0.1);
  vis.yScale = d3.scaleLinear().range([vis.height, 0]);

  // Axis

  vis.xAxis = d3.axisBottom().scale(vis.xScale);
  vis.xAxisGroup = vis.svg.append("g").attr("class", "x-axis axis");

  vis.yAxis = d3.axisLeft().scale(vis.yScale);
  vis.yAxisGroup = vis.svg.append("g").attr("class", "y-axis axis");

  vis.svg
    .select(".y-axis")
    .append("text")
    .attr("transform", "translate(0," + 0 + ")")
    .attr("class", "y-axis-text");

  // vis.updateVis(vis.dataOne, vis.dataTwo, vis.nameOne, vis.nameTwo);
};

BarChart.prototype.updateVis = function (dataOne, dataTwo, nameOne, nameTwo) {
  let vis = this;
  let svg = vis.svg;
  // 1250 is the average word length for a short story a kindergartner should read
  vis.data = [dataOne, dataTwo, 1250];
  vis.names = [nameOne, nameTwo, "Average Story"];

  let data = vis.data;
  let names = vis.names;

  //   console.log(vis.data);
  //   console.log(vis.names);

  let width = vis.width;
  let height = vis.height;

  vis.xScale.domain(
    vis.names.map(function (d) {
      return d;
    })
  );

  vis.yScale.domain([0, d3.max(data)]);
  svg
    .select(".x-axis")
    .call(vis.xAxis)
    .attr("transform", "translate(0," + height + ")");

  svg.select(".y-axis").call(vis.yAxis);

  svg
    .select(".y-axis-text")
    .text("Word Count")
    .attr("transform", "translate(0," + 0 + ")");

  let bar = svg.selectAll("rect").data(data);

  bar
    .enter()
    .append("rect")
    .attr("class", "bar")
    .merge(bar)
    .attr("x", function (d, i) {
      return vis.xScale(names[i]);
    })
    .attr("y", function (d, i) {
      return vis.yScale(data[i]);
    })
    .attr("width", vis.xScale.bandwidth())
    .attr("height", function (d) {
      return height - vis.yScale(d);
    })
    .attr("fill", function (d) {
      if (d > 1250) {
        return "#ffa391";
      } else if (d == 1250) {
        return "#f0c17f";
      } else {
        return "#bbee9e";
        l;
      }
    });
};
