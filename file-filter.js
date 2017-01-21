const path = require('path'),
    fs = require('fs'),
    mkdirp = require('mkdirp');

class FileFilter {

    constructor(folder = '.', filters = []) {
        this.folder = folder;
        this.filters = filters;

        if (!fs.existsSync(this.folder)) {
            console.log("no such directory ", this.folder);
            return;
        }
    }

    findFilesByFilters(folder) {
        let results = [],
            files = fs.readdirSync(folder || this.folder);
        for (let i = 0; i < files.length; i++) {
            let filename = path.join(folder || this.folder, files[i]);
            let stat = fs.lstatSync(filename);
            if (stat.isDirectory()) {
                results = results.concat(this.findFilesByFilters(filename)); //recurse
            } else {
                this.filters.forEach((filter) => {
                    if (filename.indexOf(filter) >= 0) {
                        console.log(`-- found: "${filename}" by filter: ${filter}`);
                        results.push({
                            filter: filter,
                            path: filename,
                            filename: files[i],
                        });
                    }
                })

            }
        }
        return results;
    }

    findFilesByAutoFilters(folder) {
        let results = [],
            files = fs.readdirSync(folder || this.folder);
        for (let i = 0; i < files.length; i++) {
            let filename = path.join(folder || this.folder, files[i]);
            let stat = fs.lstatSync(filename);
            if (stat.isDirectory()) {
                results = results.concat(this.findFilesByAutoFilters(filename)); //recurse
            } else {
                let ext = path.extname(files[i]).replace('.', '');
                if (this.filters.indexOf(ext) === -1) {
                    this.filters.push(ext);
                }
                this.filters.forEach((filter) => {
                    if (filename.indexOf(filter) >= 0) {
                        console.log(`-- found: "${filename}" by filter: ${filter}`);
                        results.push({
                            filter: filter,
                            path: filename,
                            filename: files[i],
                        });
                    }
                })

            }
        }
        return results;
    }

    sortFilesByFilters() {
        let filtered = this.findFilesByAutoFilters(this.folder);
        filtered.forEach((file) => {
            mkdirp(path.join(this.folder, file.filter), (err) => {
                if (err) {
                    console.log(err);
                } else {
                    let pathFrom = file.path,
                        pathTo = path.join(this.folder, file.filter, file.filename);
                    fs.rename(file.path, path.join(this.folder, file.filter, file.filename), (msg) => {
                        if(msg) {
                            console.log(msg);
                        }
                        console.log(`-- moved from: "${pathFrom}" to: ${pathTo}`)
                    });
                }
            });

        });
        return filtered;
    }
}



module.exports = FileFilter;
