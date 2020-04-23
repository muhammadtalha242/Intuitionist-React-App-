const filteredCollection = require("./plants_specific.json");

const Enumerable = require("linq-js");

var people = [
  { name: "Carl", age: 33, job: "Tech" },
  { name: "Homer", age: 42, job: "Tech" },
  { name: "Phipps", age: 35, job: "Nurse" },
  { name: "Doris", age: 27, job: "Nurse" },
  { name: "Willy", age: 31, job: "Janitor" },
];

var grouped = Enumerable.From(people)
  .GroupBy(
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
  .ToArray();

console.log(JSON.stringify(grouped));

/*
  "plant_name": "3GorgesWFrm2",
        "cod": "2017-06-01",
        "commercial_parameter_name": "annual_security_cost",
        "years": 4,
        "rate": "0.0372"
*/
// var linq = Enumerable.from(filteredCollection);
// var result = linq
//   .groupBy(
//       "{ Plant:$.plant_name}",
//       null,
//       function(key,g){
//           var result = {
//               Plant = key.Plant
//           };
//           var groupR = [];
//           g.forEach(function(item){
//             groupR.push(item);
//           });          
//       },
//       "$.Plant"
//   )
//   .toArray();

//   var data = [
//     { Id: 1, Name: 'NameOne' },
//     { Id: 2, Name: 'NameTwo' },
//     { Id: 2, Name: 'NameTwo' },
//     { Id: 3, Name: 'NameThree' }
// ];
// var query = Enumerable.From(filteredCollection)
//     // GroupBy (keySelector, elementSelector, resultSelector, compareSelector)
//     .GroupBy(
//         null, // (identity)
//         null, // (identity)
//         "{ Id: $.Id, Name: $.Name, Total: $$.Count() }",
//         "'' + $.Id + '-' + $.Name"
//     )
//     .ToArray();

// console.log(result);

// const restructureOutput = (filteredCollection) => {
//   var restructuredOutput = [];
//   var nameArray = false;
//   filteredCollection.forEach((collection) => {
//     var internalArray = false;
//     var updated = false;

//     console.log(
//       "STARTING COLLECTION====================================================== : ",
//       collection.plant_name,
//       collection.years
//     );

//     restructuredOutput.forEach((arr) => {
//       arr.forEach((plant) => {
//         if (plant.plant_name === collection.plant_name) {
//           console.log(
//             "plantName  exist in : ",
//             collection.plant_name,
//             collection.years
//           );

//           nameArray = true;

//           if (plant.years === collection.years) {
//             console.log(
//               "plantName and year exist in : ",
//               plant.plant_name,
//               plant.years
//             );

//             plant.commercialparameters.push({
//               commercial_parameter_name: collection.commercial_parameter_name,
//               rate: collection.rate,
//             });
//             updated = true;
//           } else {
//             console.log(
//               "plantName exist in arr but not year: ",
//               plant.plant_name,
//               plant.years
//             );

//             internalArray = true;
//           }
//         } else if (!updated && !internalArray) {
//           console.log(
//             "plant doesnot exist in arr: ",
//             plant.plant_name,
//             plant.years
//           );
//           nameArray = false;
//         }
//       });
//       if (internalArray && !updated) {
//         const powerplant = { ...collection };

//         delete powerplant.commercial_parameter_name;
//         delete powerplant.paramCombineID;
//         delete powerplant.rate;

//         powerplant.commercialparameters = [
//           {
//             commercial_parameter_name: collection.commercial_parameter_name,
//             rate: collection.rate,
//           },
//         ];
//         console.log(
//           "PLANT ADDED IN INTERNAL ARRAY:",
//           powerplant.plant_name,
//           powerplant.years
//         );
//         internalArray = false;
//         arr.push(powerplant);
//       }
//     });
//     if (!nameArray) {
//       const powerplant = { ...collection };

//       delete powerplant.commercial_parameter_name;
//       delete powerplant.paramCombineID;
//       delete powerplant.rate;

//       powerplant.commercialparameters = [
//         {
//           commercial_parameter_name: collection.commercial_parameter_name,
//           rate: collection.rate,
//         },
//       ];
//       console.log(
//         "PLANT ADDED IN EXTERNAL ARRAY:",
//         powerplant.plant_name,
//         powerplant.years
//       );

//       restructuredOutput.push([powerplant]);
//       nameArray = true;
//     }
//   });
//   console.log("restructuredOutput ", restructuredOutput);
//   return restructuredOutput;
// };
// const x = restructureOutput(filteredCollection);
// console.log(x[3][0].plant_name);
// console.log(x[3][0].years);
// console.log(x[3][0].commercialparameters);
