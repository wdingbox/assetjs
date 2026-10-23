var Uti_JiHiFigure = {
    //===https://wdingsoft.github.io/obimg/odb/tbi/img/jgif/",
    sImgBaseJgw: "http://34.224.88.91/obi/data/obimg/odb/tbi/img/jgif/",

    BASE_ANT: { path: "", ext: "gif" },

    BASE_CNF: { path: "http://34.224.88.91/obi/data/obimg/odb/tbi/img/jgif/", ext: "png" },

    //===https://wdingsoft.github.io/obimg/odb/hiero/jpegHiero/",
    xxsImgBaseHrg: "http://34.224.88.91/obi/data/obimg/odb/hiero/jpegHiero/",


    ///local
    //=file:///Users/weiding/Sites/weidroot/weidroot_2017-01-06/app/github/wdingsoft/obimg/odb/hiero/jpegHiero/0x14F36.jpg

    sImgBaseHrg: "file:///Users/weiding/Sites/weidroot/weidroot_2017-01-06/app/github/wdingsoft/obimg/odb/hiero/jpegHiero/",

    BASE_HIERO: { path: "file:///Users/weiding/Sites/weidroot/weidroot_2017-01-06/app/github/wdingsoft/obimg/odb/hiero/jpegHiero/", ext: "jpg" },

    test: function () { }
}
Uti_JiHiFigure.set_localstore = function (obj) {
    if(!obj) return alert("Uti_JiHiFigure unable to set null obj.")
    var str = JSON.stringify(obj)
    localStorage.setItem("Uti_JiHiFigure.paramsObj", str)
}
Uti_JiHiFigure.get_localstore = function () {// each app need to run this first.
    var str = localStorage.getItem("Uti_JiHiFigure.paramsObj")
    if (!str || str.length === 0) return alert("failed to get Uti_JiHiFigure.paramsObj from localStorage. \nPlease run Uti_JiHiFigure.set_localstore(obj) first.")
    var obj = JSON.parse(str)
    Uti_JiHiFigure.paramsObj = obj
}
Uti_JiHiFigure.get_localstore ();

Uti_JiHiFigure.id2src = function (pic_ids) {
    if (pic_ids.match(/\d{5}/)) {
        var id = parseInt(pic_ids)
        if (id < 20000) {//cnf png
            return `${Uti_JiHiFigure.paramsObj.BASE_CNF.path}${pic_ids}.${Uti_JiHiFigure.paramsObj.BASE_CNF.ext}`
        }
        return `${Uti_JiHiFigure.paramsObj.BASE_ANT.path}${pic_ids}.${Uti_JiHiFigure.paramsObj.BASE_ANT.ext}`
    }
    return `${Uti_JiHiFigure.paramsObj.BASE_HIERO.path}${pic_ids}.${Uti_JiHiFigure.paramsObj.BASE_HIERO.ext}`
}
Uti_JiHiFigure.id2fig = function (id, cb_extraInfo) {
    //for horiz arrage: style='margin: 0;display: inline-block;'
    id = id.trim()
    var extraInfo = ""
    if (cb_extraInfo) extraInfo = cb_extraInfo(id)
    var src = Uti_JiHiFigure.id2src(id)
    var img = `<figure style='margin: 0;display: inline-block;' class='mi'><img class='default_figimg' src='${src}'><figcaption>${id}${extraInfo}</figcaption></figure>`
    return img;
}
Uti_JiHiFigure.ids2figs = function (idary, cb_extraInfo) {
    var ret = ""
    if (typeof idary === 'string') idary = idary.split(",");
    idary.forEach(function (id) {
        id = ("" + id).trim()
        if (id) {
            ret += Uti_JiHiFigure.id2fig(id, cb_extraInfo)
        }
    });
    return ret;
}
Uti_JiHiFigure.id2img = function (id, cb_extraInfo) {
    id = id.trim()
    var extraInfo = ""
    if (cb_extraInfo) extraInfo = cb_extraInfo(id)
    var src = Uti_JiHiFigure.id2src(id)
    var img = `<img class='default_img' src='${src}'>`
    return img;
}
Uti_JiHiFigure.idary2imgs = function (idary, cb_extraInfo) {
    var imgs = ""
    idary.forEach(function (jid) {
        imgs += Uti_JiHiFigure.id2img(jid, cb_extraInfo)
    })
    return imgs;
}


Uti_JiHiFigure.src2id = function (img_src) {
    img_src = img_src.trim();
    var mat = img_src.match(/[\/](\w{1,20}).\w{3,4}$/);
    if (mat) {
        var picid = mat[1]
        return picid.trim();
    }
    return img_src;
}
Uti_JiHiFigure.imgHolder2idary = function (ehldr) {
    var retar = []
    $(ehldr).find("img").each(function () {
        var src = $(this).attr("src").trim();
        retar.push(Uti_JiHiFigure.src2id(src))
    })
    return retar;
}
Uti_JiHiFigure.imgHolder2idstr = function (ehldr) {
    var retar = Uti_JiHiFigure.imgHolder2idary(ehldr).join(",").replace(/\s/g, "");
    return retar;
}












///
///
///


var copy_fr____JgwUti = {
    //===https://wdingsoft.github.io/obimg/odb/tbi/img/jgif/",
    sImgBaseJgw: "http://34.224.88.91/obi/data/obimg/odb/tbi/img/jgif/",

    //===https://wdingsoft.github.io/obimg/odb/hiero/jpegHiero/",
    sImgBaseHrg: "http://34.224.88.91/obi/data/obimg/odb/hiero/jpegHiero/",



    SrcJgw: function (id) {
        if (!id) return ""
        id = ('' + id).trim()
        return `${JgwUti.sImgBaseJgw}${id}.gif`
    },
    IdJgw: function (src) {
        var s = src.substr(JgwUti.sImgBaseJgw.length, 5)
        return s
    },
    SrcHiero: function (id) {
        if (!id) return ""
        id = id.trim()
        return `${JgwUti.sImgBaseHrg}${id}.jpg`
    },

    GetImgIdFrSrc: function (imgsrc) {
        var n = imgsrc.match(/([^\.\/]+)[\.]/i);
        var imgid = n ? n[1] : "0";
        return imgid;
    },//////////////////////////////////////////////////////
    GenJgwImg: function (id, sComma) {
        //  src="../../../../___bigdata/___compact/___solid/odb/tbi/img/jgif/62880.gif"
        //var src="../../../../___bigdata/___compact/___solid/odb/tbi/img/jgif/"+id+".gif";
        //var src=`../../../../../bitbucket/wdingsoft/obidat/imgtbi/tbi/img/jgif/${id}.gif`;
        //var src= `https://wdingsoft.github.io/obimg/odb/tbi/img/jgif/${jid}.gif`
        var src = JgwUti.SrcJgw(id)
        return `<div class='mi'><a>${id}${sComma}</a><br><img src='${src}'/></div>`;
    },/////////////////////////////////////////////
    GenHieroImg: function (id, sComma) {
        //src=../../../../___bigdata/___compact/___solid/odb/hiero/ccer-h/J26.gif
        //var src="../../../../___bigdata/___compact/___solid/odb/hiero/ccer-h/"+id+".gif";
        //var src=`../../../../../bitbucket/wdingsoft/obidat/imghiero/hiero/jpegHiero/${id}.jpg`;
        //var src=`../../../../../bitbucket/wdingsoft/obidat/imghiero/hiero/jpegHiero/${id}.jpg`;
        var src = JgwUti.SrcHiero(id)
        return `<div class='mi'><a>${id}${sComma}</a><br><img src='${src}'/></div>`;
    },////////////////////////////////////////////
    Get_Ary_fr_ImgListStr: function (strList) {
        var compoundArr = strList.split(",");
        var retArr = [];
        $.each(compoundArr, function (i, v) {
            var v2 = $.trim(v);
            if (v2.length > 0) {
                retArr.push(v2);
            }
        });
        return retArr;
    },////////////////////////////////////////////////////////
    Get_Ary_fr_ImgListStr_UniqSorted: function (strList) {
        var retArr = JgwUti.Get_Ary_fr_ImgListStr(strList);
        var uniqArr = [];
        $.each(retArr, function (i, str) {
            if (uniqArr.indexOf(str) < 0) {
                uniqArr.push(str);
            };
        });
        uniqArr.sort();
        return uniqArr;
    },///////////////////////////////////////////////////
    Get_Htm_jink: function (str) {
        var arr = JgwUti.Get_Ary_fr_ImgListStr(str);
        var ss = "";
        $.each(arr, function (i, v) {
            v = $.trim(v);
            if (v.length > 0) {
                ss += JgwUti.GenJgwImg(v, ",");
            };
        });
        return ss;
    },////////////////////////////////////////////
    Get_Htm_jtoh: function (str) {
        arr = JgwUti.Get_Ary_fr_ImgListStr(str);
        var ss = "";
        $.each(arr, function (i, v) {
            v = $.trim(v);
            if (v.length > 0) {
                ss += JgwUti.GenHieroImg(v, ",");
            };
        });
        return ss;
    },////////////////////////////////////////////





    paddingStr: function (str, len) {
        if (str.length >= len) {
            return str.substr(0, len);
        }
        while (str.length < len) str = " " + str;
        return str;
    },



    ARowDiffArr: function (arr1, arr2) {
        if (!arr1 || !arr2) {
            console.assert("err");
            return [];
        }
        var diffArr = [];
        for (var i = 1; i < arr1.length; i++) {
            if (arr1[i] != arr2[i]) {
                diffArr.push(i);
            };
        };
        return diffArr;
    },









    Get_Ary_fr_Arry_by_Colval: function (iColidx, sColval, Arr) {
        for (var i = 0; i < Arr.length; i++) {
            if (sColval === Arr[i][iColidx]) {
                return Arr[i];
            }
        }
        return [];
    },

    Get_Idx_Ary_fr_Arry_by_Colval: function (iColidx, sColval, Arr) {
        for (var i = 0; i < Arr.length; i++) {
            if (sColval === Arr[i][iColidx]) {
                return i;
            }
        }
        return -1;
    },
    GetUniqDatArr: function (arry) {
        var retArr = [];
        var uniq = [];
        $.each(arry, function (i, ar) {
            var key = ar.join();
            if (uniq.indexOf(key) < 0) {
                uniq.push(key);
                retArr.push(ar);
            };
        });
        return retArr;
    },





    Copy_Ary: function (arrSrc, arrDes) {
        if (!arrDes) {
            return alert("arr Dest fatal error.");
        }
        for (var i = 0; i < arrSrc.length; i++) {
            arrDes[i] = "" + arrSrc[i];
        };
    },
    clone_ary: function (arrSrc) {
        var ary = new Array();
        this.Copy_Ary(arrSrc, ary);
        return ary;
    },


    UpdateAnyDiffDatArr: function (datArrSrc, datArrDest) {
        var diffOrigArr = [];
        for (var m = 0; m < datArrSrc.length; m++) {
            var jid = datArrSrc[m][1];
            var idx = JgwUti.Get_Idx_Ary_fr_Arry_by_Colval(1, jid, datArrDest);
            if (idx >= 0) {
                var OrigArr = JgwUti.clone_ary(datArrDest[idx]);
                diffOrigArr.push(OrigArr);
                JgwUti.Copy_Ary(datArrSrc[m], datArrDest[idx]);
            };
        };
        return diffOrigArr;
    },/////////////////////////////////////////////////////////////////////////

    AnyArry_CompareTo_Stdrry: function (datArr, StdArr) {
        if (!StdArr) {
            return alert("Std JidaArry is null.");
        }

        var changedDatArr = [];
        var changedColArr = [];
        for (var k = 0; k < datArr.length; k++) {
            var Jidrow = JgwUti.Get_Ary_fr_Arry_by_Colval(1, datArr[k][1], StdArr);
            if (null === Jidrow || Jidrow.length == 0) {
                Jidrow = this.m_defaultEmptyRow;
            }
            var diffArr = JgwUti.ARowDiffArr(datArr[k], Jidrow);
            if (diffArr.length > 0) {
                changedDatArr.push(datArr[k]);
                changedDatArr.push(Jidrow);
                changedColArr.push(diffArr);
            }
        }
        return { "changedRowArry": changedDatArr, "changedColArry": changedColArr };
    },



    varify_two_data_in_general: function (aarry1, aarry2) {
        var n1 = aarry1.length, n2 = aarry2.length;
        var ret = "";
        if (n1 != n2) {
            ret += "data_size_different=" + n1 + ":" + n2;
        }
        var n = n1 < n2 ? n1 : n2;
        RowDiffCount = 0;
        FrqDiffCount = 0;
        IdxDiffCount = 0;
        JidDiffCount = 0;
        for (var i = 0; i < n; i++) {
            var diffarr = JgwUti.ARowDiffArr(aarry1[i], aarry2[i]);
            if (diffarr.length > 0) {
                RowDiffCount++;
            }
            if (aarry1[i][4] != aarry2[i][4]) {
                FrqDiffCount++;
            }
            if (aarry1[i][0] != aarry2[i][0]) {
                IdxDiffCount++;
            }
            if (aarry1[i][1] != aarry2[i][1]) {
                JidDiffCount++;
            }
        }
        ret += "\nRowDiffCount=" + RowDiffCount;
        ret += "\nFrqDiffCount=" + FrqDiffCount;
        ret += "\nIdxDiffCount=" + IdxDiffCount;
        ret += "\nJidDiffCount=" + JidDiffCount;
        console.log(ret);
        alert(ret);

    },

    Get_Ary_SortedItem_Jid_Frq: function (JidFrqDict) {
        // Create items array
        var items = Object.keys(JidFrqDict).map(function (key) {
            return [key, JidFrqDict[key]];
        });

        // Sort the array based on the second element
        items.sort(function (first, second) {
            return second[1] - first[1];
        });
        return items;
    },
};















