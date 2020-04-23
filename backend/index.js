const filteredCollection = require("./routes/SDDP/SampleData/plants_specific.json");

const Enumerable = require("linq-js");
/*
  "plant_name": "3GorgesWFrm2",
        "cod": "2017-06-01",
        "commercial_parameter_name": "annual_security_cost",
        "years": 4,
        "rate": "0.0372"
*/
var collection = Enumerable.from(filteredCollection)
  .groupBy(
    function (plant) {
      return `${plant.plant_name, plant.years, plant.commercial_parameter_name}`;
    }, // Key selector
    function (plant) {
      return `plant:${plant.plant_name}, years:${plant.years}, commercial_parameter_name:${plant.commercial_parameter_name} `;
    }, // Element selector
    function (key, grouping) {
      // Result selector
      return {
        plant: key,
        params: grouping.source,
      };
    }
  )
  .toArray();

console.log(JSON.stringify(collection));

var people = [
  { name: "Carl", age: 33, job: "Tech" },
  { name: "Homer", age: 42, job: "Tech" },
  { name: "Phipps", age: 35, job: "Nurse" },
  { name: "Doris", age: 27, job: "Nurse" },
  { name: "Willy", age: 31, job: "Janitor" },
];
var grouped = Enumerable.from(people)
  .groupBy(
    function (person) {
      return person.job;
    }, // Key selector
    function (person) {
      return person;
    }, // Element selector
    function (job, grouping) {
      // Result selector
      return {
        job: job,
        persons: grouping.source,
      };
    }
  )
  .toArray();

console.log(JSON.stringify(grouped));
