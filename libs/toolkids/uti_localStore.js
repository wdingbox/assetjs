

function uti_localStoreMgr(storeid) {
    this.m_storageItemID = storeid //"Most_Recent_Img_List" 
}

uti_localStoreMgr.prototype.update_storage = function (sid, cbf) {
    var str = localStorage.getItem(this.m_storageItemID)
    if (!str) str = ""

    var uniq = str.split(",").filter((element, index, self) => {
        return element && element.length > 0 && index === self.indexOf(element);//unique
    }).filter(id => id != sid) //remove id=sid

    if (sid && sid.length > 0) uniq.unshift(sid) //prepend sid
    uniq = uniq.slice(0, 200)//max hold
    localStorage.setItem(this.m_storageItemID, uniq.join(","))//save
    if (cbf) cbf(uniq)
    return uniq
}

uti_localStoreMgr.prototype.get_imgs = function () {
    var ar = this.update_storage()
    var imgs = ""
    ar.forEach(function (sid) {
        imgs += `<img class='localStore_MR' title='${sid}' src='${sid}'/>`
    })
    return imgs
}


var uti_localStore = {

}
uti_localStore.create_MR = function (elmID, storageItemID, cbf) {
    var mrj = new uti_localStoreMgr(storageItemID)
    var ary = mrj.update_storage()
    var img = ""
    if (cbf) img = cbf(ary)
    $(elmID).html(img)
    return mrj;
}
uti_localStore.update_MrJid = function (jid) {
    var mrj = new uti_localStoreMgr("Most_Recent_Jid_List")
    var ary = mrj.update_storage(jid)
    return ary;
}

uti_localStore.g_MrJid = new uti_localStoreMgr("Most_Recent_Jid_List")
uti_localStore.g_MrHid = new uti_localStoreMgr("Most_Recent_Hid_List")
uti_localStore.MrStoreUpdateId = function (sid) {
    if (sid === "hid") return uti_localStore.g_MrHid.update_storage()
    if (sid === "jid") return uti_localStore.g_MrJid.update_storage()
    var mat = sid.match(/\d{5}/)
    if (mat) {
        uti_localStore.g_MrJid.update_storage(sid)
    }
    mat = sid.match(/[A-Z]+/)
    if (mat) {
        uti_localStore.g_MrHid.update_storage(sid)
    }
}

uti_localStore.MrImgs = function (sid) {
    if (sid === "hid") return uti_localStore.g_MrHid.get_imgs()
    if (sid === "jid") return uti_localStore.g_MrJid.get_imgs()
    alert("jid or hid?")
}