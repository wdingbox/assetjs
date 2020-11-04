
var fs = require('fs');
const path = require('path');
const { mainModule } = require('process');

var Uti = {
    GetFilesAryFromDir: function (startPath, deep, cb) {//startPath, filter
        function recursiveDir(startPath, deep, outFilesArr) {
            var files = fs.readdirSync(startPath);
            for (var i = 0; i < files.length; i++) {
                var filename = path.join(startPath, files[i]);
                //console.log(filename);
                var stat = fs.lstatSync(filename);
                if (stat.isDirectory()) {
                    if (deep) {
                        recursiveDir(filename, deep, outFilesArr); //recurse
                    }
                    continue;
                }/////////////////////////
                else if (cb) {
                    //console.log("file:",filename)
                    if (!cb(filename)) continue
                }
                outFilesArr.push(filename);
            };
        };/////////////////////////////////////

        var outFilesArr = [];
        recursiveDir(startPath, deep, outFilesArr);
        return outFilesArr;
    }
}
function main(arg) {
    arg = (undefined === arg) ? { indir: "../libs", outfile: "sample.htm" } : arg
    const urlroot = "https://wdingbox.github.io/assetjs"
    function getjs(fname) {
        return `<script src='${fname}' type='application/javascript'></script>\n`
    }
    var str = "", opts = ""
    var arr = Uti.GetFilesAryFromDir(arg.indir, true, function (fname) {
        var sta = fs.statSync(fname)
        fname = fname.substr(3)
        opts += `<tr><td></td><td class='fname'>${fname}</td><td>${sta.size}</td><td>${sta.mtime}</td></tr>\n`
        fname = `${urlroot}/${fname}`
        console.log("fname:", fname, sta)
        str += getjs(fname)
    })
    str += getjs("sample.js")
    var htm = `<html><head>${str}
    <link rel="stylesheet" href="sample.css"></link>
    </head><body>
    <table border='1'><thead><tr><th>#</th><th>file</th><th>size</th><th>mtime</th></tr><thead>\n<tbody id='sels'>${opts}</tbody></table>\n<textarea id='out' cols='200' rows='100'>...</textarea>\n</body></html>`
    fs.writeFileSync(arg.outfile, htm, "utf8")
}

main()