const ExcelJS = require('exceljs');
class Excel {

    workbook (){

        return new ExcelJS.Workbook();

    }
    createSheet = (workbook, sheetName) => {
        const worksheet = workbook.addWorksheet(sheetName);
        return workbook.getWorksheet(sheetName);

    }


    // COLUMNS STRUCTURE
    // [
    //     { header: 'Id', key: 'id', width: 10 },
    //     { header: 'Name', key: 'name', width: 32 },
    //     { header: 'D.O.B.', key: 'DOB', width: 10, outlineLevel: 1 }
    //   ];

    restructureColumns(col) {
        const obj = {}
        obj["header"] = col
        obj["key"] = col
        return obj

    }
    worksheetColumns(worksheet, cols){

        worksheet.columns = cols.map(col=>this.restructureColumns(col))


    }
    // ROW STRUCTURE
    // {id: 2, name: 'Jane Doe', dob: new Date(1965,1,7)};

    worksheetAddRow (worksheet, rowObject) {


        worksheet.addRow(rowObject);

    }
    writeFile (workbook, fileName) {
        workbook.csv.writeFile(`${fileName}.csv`)
            .then(() => {
                console.log("done")
            });
    }

}
module.exports = Excel