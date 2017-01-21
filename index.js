const FileFilter = require('./file-filter');

const filter = [
	'jpg', 
	'jpeg',
	'png', 
	'bmp', 
	'webm', 
	'mp4', 
	'gif', 
	];
const folder = 'D:\\test-data';

let fileFilter = new FileFilter(folder, filter);

let res = fileFilter.sortFilesByFilters();
//console.log(res);