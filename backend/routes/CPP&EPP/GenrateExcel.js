// Require library
const excel = require('excel4node');

exports.createExcel = (obj) => {
    console.log("this is excel modules", obj)
    getObject(obj)
}
getObject = (obj) => {
    var Name_row = 4 //0-99
    var Name_col = 0 //A-z
    var value_row = 4 //0-99
    var value_col = 2 //A-z
    var date_row = 3 //0-99
    var date_col = 2 //A-z

    // Create a new instance of a Workbook class
    // var workbook = new excel.Workbook();


    const commercialAndPowerPlants = Object.entries(obj)
    commercialAndPowerPlants.forEach(commercial => {


        const commercialParater = commercial[0]
        // var worksheet = workbook.addWorksheet(`${commercialParater}`);

        const dateAndPowerPlants = Object.entries(commercial[1])
        

        dateAndPowerPlants.forEach(dateAndPlant => {
            date_col++
            const date = new Date(dateAndPlant[0])
            // worksheet.cell(date_row,date_col).Date(date)
            const allPowerPlants = dateAndPlant[1]

            allPowerPlants.forEach(plant => {
                Name_row++
                const powerPlantName = plant.plant_name
                const indexedValue = plant.index
                // worksheet.cell(Name_row,Name_col).string(plan)

                Object.entries(plant.assumptions).forEach(assumption=>{
                    Name_row++
                    const assumptionName= assumption[0]
                    const assumptionValue = assumption[1]

                })
            })

        })

    })
}


// Add Worksheets to the workbook
// var worksheet2 = workbook.addWorksheet('Sheet 2');

// Create a reusable style
// var style = workbook.createStyle({
//   font: {
//     color: '#FF0800',
//     size: 12
//   },
//   numberFormat: '$#,##0.00; ($#,##0.00); -'
// });

// Set value of cell A1 to 100 as a number type styled with paramaters of style
// worksheet.cell(1,1).number(100).style(style);

// // Set value of cell B1 to 300 as a number type styled with paramaters of style
// worksheet.cell(1,2).number(200).style(style);

// // Set value of cell C1 to a formula styled with paramaters of style
// worksheet.cell(1,3).formula('A1 + B1').style(style);

// // Set value of cell A2 to 'string' styled with paramaters of style
// worksheet.cell(2,1).string('string').style(style);

// // Set value of cell A3 to true as a boolean type styled with paramaters of style but with an adjustment to the font size.
// worksheet.cell(3,1).bool(true).style(style).style({font: {size: 14}});
// // console.log("EXCEL GENRATED??")
// // workbook.write('Excel.xlsx');