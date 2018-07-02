const path = require('path');
const fs = require('fs');

let CopyFolder = (source, target) => {
    try {
        let checkS = fs.statSync(source);

        // source is not folder
        if (!checkS.isDirectory) {
            console.error('source is not a folder');
            throw source + ' is not a folder'
        }

        // target folder is exist, we don't create again
        if (!fs.existsSync(target)) {
            fs.mkdirSync(target);
        } else {
            let checkT = fs.statSync(target);
            if (!checkT.isDirectory) {
                throw target + ' is not a folder'
            }
        }

        let fileList = fs.readdirSync(source);
        for (let i = 0; i < fileList.length; ++i) {
            let file = fileList[i];

            let stat = fs.statSync(path.join(source, file));
            if (stat && stat.isDirectory()){
                // create next folder to target
                CopyFolder(path.join(source, file), path.join(target, file));
            } else {
                // copy file
                console.log('copy ' + path.join(source, file) + ' to ' + path.join(target, file));
                fs.writeFileSync(path.join(target, file), fs.readFileSync(path.join(source, file)));
            }
        }
    } catch(e) {
        console.error('error');
    }
}

exports.CopyFolder = CopyFolder;

