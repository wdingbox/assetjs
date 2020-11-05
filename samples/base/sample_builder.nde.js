
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

function getjs(fname) {
    return `<script src='${fname}' type='application/javascript'></script>\n`
}
function gethtm(indir) {
    const urlroot = "https://wdingbox.github.io/assetjs"
    var str = "", trs = ""
    var arr = Uti.GetFilesAryFromDir(indir, true, function (fname) {
        var sta = fs.statSync(fname)
        fname = fname.substr(3*2)
        trs += `<tr><td></td><td class='fname'>${fname}</td><td>${sta.size}</td><td>${sta.mtime}</td></tr>\n`
        fname = `${urlroot}/${fname}`
        console.log("fname:", fname, sta)
        str += getjs(fname)
    })
    return { str: str, trs: trs }
}
function main() {
    
    var ret1 = gethtm("../../libs")
    var ret2 = gethtm("../../data")

    var htm = `<html><head>${ret1.str+ret2.str}
    <!------>
    <script src='sample.js' type='application/javascript'></script>
    <link rel="stylesheet" href="sample.css"></link>
    </head><body>
    <a href='https://wdingbox.github.io/assetjs/samples/base/sample.htm'>
    https://wdingbox.github.io/assetjs/samples/base/sample.htm
    </a><br>
    <table border='1'><thead><tr><th>#</th><th>file</th><th>size</th><th>mtime</th></tr><thead>\n<tbody id='sels'>${ret1.trs+ret2.trs}</tbody></table>\n<textarea id='out' cols='200' rows='30'>...</textarea>\n</body></html>`
    fs.writeFileSync("sample.htm", htm, "utf8")
}

main()