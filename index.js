const FileFilter = require('./file-filter');

let fileFilter = new FileFilter('./test-data', ['jpg', 'png']);

let res = fileFilter.sortFilesByFilters();
//console.log(res);