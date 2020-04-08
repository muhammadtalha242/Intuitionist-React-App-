const ExcelJS = require('exceljs');


var workbook = new ExcelJS.Workbook();

var sheet = workbook.addWorksheet('My Sheet');

var worksheet = workbook.getWorksheet('My Sheet');

worksheet.columns = [
    { header: 'Id', key: 'id', width: 10 },
    { header: 'Name', key: 'name', width: 32 },
    { header: 'D.O.B.', key: 'DOB', width: 10, outlineLevel: 1 }
  ];

worksheet.addRow({id: 1, name: 'John Doe', dob: new Date(1970,1,1)});
worksheet.addRow({id: 2, name: 'Jane Doe', dob: new Date(1965,1,7)});

workbook.csv.writeFile("My Sheet.csv")
  .then(() => {
    console.log("done")
  });