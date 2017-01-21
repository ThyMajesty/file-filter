const FileFilter = require('./file-filter');


let fileFilter = new FileFilter('./test-data', []);

let res = fileFilter.sortFilesByFilters();
//console.log(res);