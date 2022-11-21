// Stores all story contents
let stories = {};
let words = sight;

// Story names
let names = {
  fish: "The Fish and the Ring",
  fox: "Mr. Fox",
  henny: "Henny-Penny",
  jack: "Jack and the Beanstalk",
  bears: "The Story of the Three Bears",
  pigs: "The Story of the Three Little Pigs",
};

// Variables for the visualization instances
let piechartOne, piechartTwo, barchart;

// Entry point into program
loadData();

function loadData() {
  // story contents are stored in stories.js file after being parsed with python
  stories["fish"] = fish;
  stories["fox"] = fox;
  stories["henny"] = henny;
  stories["jack"] = jack;
  stories["bears"] = bears;
  stories["pigs"] = pigs;
  // DEBUG
  //   console.log(stories);
  //   console.log(words);
  createVis();
}

function createVis() {
  piechartOne = new PieChart("pie-chart-one", [], "Choose Story");
  piechartTwo = new PieChart("pie-chart-two", [], "Choose Story");
  barchart = new BarChart("bar-chart");

  d3.select("#choose-story-one").on("change", function (d) {
    let value = document.getElementById("choose-story-one").value;
    if (value !== "none") {
      piechartOne.updateVis(stories[value], names[value]);
      updateBar();
    }
  });
  d3.select("#choose-story-two").on("change", function (d) {
    let value = document.getElementById("choose-story-two").value;
    if (value !== "none") {
      piechartTwo.updateVis(stories[value], names[value]);
      updateBar();
    }
  });
}

function updateBar() {
  let rawVal1 = document.getElementById("choose-story-one").value;
  let rawVal2 = document.getElementById("choose-story-two").value;
  let value1 = rawVal1 !== "none" ? stories[rawVal1].length : "";
  let value2 = rawVal2 !== "none" ? stories[rawVal2].length : "";
  let name1 = rawVal1 !== "none" ? names[rawVal1] : "";
  let name2 = rawVal2 !== "none" ? names[rawVal2] : "";
  barchart.updateVis(value1, value2, name1, name2);
}
