
function uti_downloader() {

}
uti_downloader.prototype.Donwload_ObjAry_json = function (objname) {
    function replacer(key, val) {
        if (key.length > 0 && typeof val === "object") {
            var str = JSON.stringify(val);;///.replace(/\"/g,"")
            return str
        }
        return (val)
    }

    var obj = eval(objname)
    var text = `var ${objname} = \n` + JSON.stringify(obj, replacer, 4)

    ////Modifying
    text = text.replace(/\"\[\\/g, '[')
    text = text.replace(/\\\"\,/g, '\"\,')
    text = text.replace(/\]\"/g, '\]')
    text = text.replace(/\,/g, '\, ')
    text = text.replace(/\\\"/g, '\"')

    /////downloading
    var fname = `${objname}.json.js`
    var _THIS = this
    setTimeout(function () {
        _THIS.Donwload_Text(fname, text)
    }, 0)
    return text;
}
uti_downloader.prototype.Donwload_Obj_to_Jsfile = function (oname, obj, cbf) {
    var text = `var ${oname} = \n` + JSON.stringify(obj, null, 4)
    var fname = `${oname}.json.js`
    this.Donwload_Text(fname, text)
    if (cbf) cbf(text)
}
uti_downloader.prototype.Donwload_ObjName_to_NeatJsonfile = function (objname, cbf) {
    function replacer(key, val) {
        if (key.length > 0 && typeof val === "object") {
            var str = JSON.stringify(val);;///.replace(/\"/g,"")
            return str
        }
        return (val)
    }

    var obj = eval(objname)
    var text = `var ${objname} = \n` + JSON.stringify(obj, null, 4)
    
    var fname = `${objname}.json.js`
    this.Donwload_Text(fname, text)
    if (cbf) cbf(text)
}
uti_downloader.prototype.Donwload_Text = function (dwnfname, dwntext) {

    var link = document.createElement('a');
    link.download = dwnfname;///'welcome.txt';

    let blob = new Blob([dwntext], { type: 'text/plain;charset=utf-8' });
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);

    //if (link.destroy) {
        link.destroy() //prevent from multiple download.
    //}
    link.remove()
    delete link;
    link = null
}




