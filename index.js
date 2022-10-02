const ingredients = [
    {
        id: 1,
        name: 'Marul',
        amount: 5
    },
    {
        id: 2,
        name: "Turşu",
        amount: 5
    },
    {
        id: 3,
        name: 'Paket Sos',
        amount: 5
    },
    {
        id: 4,
        name: 'Soğan',
        amount: 5
    },
    {
        id: 5,
        name: 'Köfte',
        amount: 5
    },
    {
        id: 6,
        name: 'Tavuk',
        amount: 5
    },
    {
        id: 7,
        name: 'Domates',
        amount: 5
    },
    {
        id: 8,
        name: 'Ekmek',
        amount: 5
    },
    {
        id: 9,
        name: 'Patates',
        amount: 5
    },
    {
        id: 10,
        name: 'Kola',
        amount: 5
    }
]
const servisUrunuBaslagic = {
    hamburger: {
        hamburgerCesidi: {
            tavuk: false,
            kofte: false
        },
        marul: false,
        sogan: false,
        domates: false,
        ekmek: false,
        tursu: false,
        hamburgerDurumu: false
    },
    patates: false,
    kola: false,
    paketSos: false,
}
let servisUrunu = JSON.parse(JSON.stringify(servisUrunuBaslagic));

const amount = (elementId, ingredient) => {
    const ingredientAmount = ingredients.find(x => x.name == ingredient).amount
    document.getElementById(elementId).innerHTML = ingredientAmount
}
var originalHtml = document.body.innerHTML;
const refreshPage = () => {
    document.body.innerHTML = originalHtml;
}
const wait = ms => new Promise(resolve => setTimeout(resolve, ms))
const showById = (elementId) => {
    const element = getElementById(elementId)
    element.style.display = "flex"
}
const hideById = (elementId) => {
    const element = getElementById(elementId)
    element.style.display = "none";
}
const getElementById = (elementId) => {
    return document.getElementById(elementId)
}
const removeElementById = (elementId) => {
    const element = getElementById(elementId)
    element.remove()
}
const btnDisable = (elementId) => {
    const element = getElementById(elementId)
    element.disabled = true
}
const btnActivate = (elementId) => {
    const element = getElementById(elementId)
    element.disabled = false
}
const textChange = (elementId, text) => {
    document.getElementById(elementId).innerText = text;
}
const consumeOne = (ingredientName) => {
    const ingredient = ingredients.find(x => x.name == ingredientName);
    ingredient.amount--;
}
const replaceClass = (elementId, oldClass, newClass) => {
    const element = getElementById(elementId)
    element.classList.replace(oldClass, newClass)
}
const stokBittiMi = (ingredients) => {
    const bitenSayisi = ingredients.filter(x => x.amount == 0).length
    if (bitenSayisi != 0) {
        return true;
    }
    else {
        return false;
    }
}

const marulAdetGoster = () => amount("marulAdet", "Marul")
const tursuAdetGoster = () => amount("tursuAdet", "Turşu")
const soganAdetGoster = () => amount("soganAdet", "Soğan")
const kofteAdetGoster = () => amount("kofteAdet", "Köfte")
const tavukAdetGoster = () => amount("tavukAdet", "Tavuk")
const domatesAdetGoser = () => amount("domatesAdet", "Domates")
const ekmekAdetGoster = () => amount("ekmekAdet", "Ekmek")
const patatesAdetGoster = () => amount("patatesAdet", "Patates")
const icecekAdetGoster = () => amount("icecekAdet", "Kola")
const paketSosAdetGoster = () => amount("paketSosAdet", "Paket Sos")

const butunMalzemeleriGoster = () => {
    marulAdetGoster()
    paketSosAdetGoster()
    soganAdetGoster()
    kofteAdetGoster()
    tavukAdetGoster()
    domatesAdetGoser()
    ekmekAdetGoster()
    patatesAdetGoster()
    icecekAdetGoster()
    tursuAdetGoster()
}
butunMalzemeleriGoster()


const siparisAl = () => {
    btnDisable("btnSiparis")
    wait(1000).then(() => {
        hideById("btnSiparis")
        showById("stokKontrolYazisi")
        return wait(3000)
    })
        .then(() => {
            if (stokBittiMi(ingredients) == true) {
                throw 'Stok bitti'
            }
            hideById("stokKontrolYazisi")
            showById("menuSecim")
            showById("hamburgerTuru")
        })
        .catch(() => {
            alert("Malzeme eksik")
            refreshPage()
            removeElementById("btnSiparis")
            showById("stokBittiYazisi")
            butunMalzemeleriGoster()
        });
}

const tavukSec = () => {
    hideById("btnKofte")
    btnDisable("btnTavuk")
    wait(1000).then(() => {
        consumeOne("Tavuk")
        tavukAdetGoster()
        hideById("hamburgerTuru")
        textChange("pisirmeDurumYazisi", "Tavuk pişiyor...")
        showById("pisirmeDurumYazisi")
        return wait(3000)
    })
        .then(() => {
            servisUrunu.hamburger.hamburgerCesidi.tavuk = true;
            replaceClass("pisirmeDurumYazisi", "text-warning", "text-success")
            textChange("pisirmeDurumYazisi", "Tavuk Pişti")
            btnActivate("btnHamburgeriTamamla")
        })
}
const kofteSec = () => {
    hideById("btnTavuk")
    btnDisable("btnKofte")
    wait(1000).then(() => {
        hideById("hamburgerTuru")
        showById("pisirmeTuru")
        consumeOne("Köfte")
        kofteAdetGoster()
    })
}

const azPismis = () => {
    hideById("pisirmeTuru")
    textChange("pisirmeDurumYazisi", "Az pişmiş olacak şekilde köfte pişiyor...")
    showById("pisirmeDurumYazisi")
    wait(2000).then(() => {
        servisUrunu.hamburger.hamburgerCesidi.kofte = true;
        replaceClass("pisirmeDurumYazisi", "text-warning", "text-success")
        textChange("pisirmeDurumYazisi", "Az Pişmiş Köfte Hazır")
        btnActivate("btnHamburgeriTamamla")
    })
}
const ortaPismis = () => {
    hideById("pisirmeTuru")
    textChange("pisirmeDurumYazisi", "Orta pişmiş olacak şekilde köfte pişiyor...")
    showById("pisirmeDurumYazisi")
    wait(3000).then(() => {
        servisUrunu.hamburger.hamburgerCesidi.kofte = true;
        replaceClass("pisirmeDurumYazisi", "text-warning", "text-success")
        textChange("pisirmeDurumYazisi", "Orta Pişmiş Köfte Hazır")
        btnActivate("btnHamburgeriTamamla")
    })
}
const cokPismis = () => {
    hideById("pisirmeTuru")
    textChange("pisirmeDurumYazisi", "Çok pişmiş olacak şekilde köfte pişiyor...")
    showById("pisirmeDurumYazisi")
    wait(4000).then(() => {
        servisUrunu.hamburger.hamburgerCesidi.kofte = true;
        replaceClass("pisirmeDurumYazisi", "text-warning", "text-success")
        textChange("pisirmeDurumYazisi", "Çok Pişmiş Köfte Hazır")
        btnActivate("btnHamburgeriTamamla")
    })
}

const marulSec = () => {
    btnDisable("btnMarul")
    consumeOne("Marul")
    marulAdetGoster()
    servisUrunu.hamburger.marul = true;
}
const domatesSec = () => {
    btnDisable("btnDomates")
    consumeOne("Domates")
    domatesAdetGoser()
    servisUrunu.hamburger.domates = true;
}
const tursuSec = () => {
    btnDisable("btnTursu")
    consumeOne("Turşu")
    tursuAdetGoster()
    servisUrunu.hamburger.tursu = true;

}
const soganSec = () => {
    btnDisable("btnSogan")
    consumeOne("Soğan")
    soganAdetGoster()
    servisUrunu.hamburger.sogan = true;
}

function menuHazir() {
    if (servisUrunu.patates === true && servisUrunu.hamburger.hamburgerDurumu === true && servisUrunu.kola === true) {
        hideById("menuSecim")
        showById("btnTepsiKoy")
    }
}

function kizartmayiBekle(item, event) {
    return new Promise((resolve) => {
        const listener = () => {
            hideById("btnPatatesKizart")
            consumeOne("Patates")
            patatesAdetGoster()
            showById("kizartmaHazirYazisi")
            wait(5000).then(() => {
                servisUrunu.patates = true;
                replaceClass("kizartmaHazirYazisi", "text-warning", "text-success")
                textChange("kizartmaHazirYazisi", "Patates kızartması hazır")
                resolve()
            })
        }
        item.addEventListener(event, listener);
    })
}
function hamburgeriBekle(item, event) {
    return new Promise((resolve) => {
        const listener = () => {
            hideById("hamburgerBody")
            hideById("hamburgerFooter")
            showById("hamburgerHazirlaniyorYazisi")
            wait(2000).then(() => {
                replaceClass("hamburgerHazirlaniyorYazisi", "text-warning", "text-success")
                textChange("hamburgerHazirlaniyorYazisi", "Hamburger hazır")
                consumeOne("Ekmek")
                ekmekAdetGoster()
                servisUrunu.hamburger.ekmek = true
                servisUrunu.hamburger.hamburgerDurumu = true;
                resolve()
            })
        }
        item.addEventListener(event, listener);
    })
}
function icecekBekle(item, event) {
    return new Promise((resolve) => {
        const listener = () => {
            hideById("btnIcecekDoldur")
            consumeOne("Kola")
            icecekAdetGoster()
            showById("icecekHazirYazisi")
            wait(2000).then(() => {
                servisUrunu.kola = true;
                replaceClass("icecekHazirYazisi", "text-warning", "text-success")
                textChange("icecekHazirYazisi", "İçecekler hazır")
                resolve()
            })
        }
        item.addEventListener(event, listener)
    })
}
async function hamburgerHazirla() {
    const btnHamburgeriTamamla = getElementById("btnHamburgeriTamamla")
    await hamburgeriBekle(btnHamburgeriTamamla, "click")
    menuHazir()
}
async function kizartmaHazirla() {
    const btnPatatesiKizart = getElementById("btnPatatesKizart")
    await kizartmayiBekle(btnPatatesiKizart, "click")
    menuHazir()
}
async function icecekHazirla() {
    const btnIcecekiDoldur = getElementById("btnIcecekDoldur")
    await icecekBekle(btnIcecekiDoldur, "click")
    menuHazir()
}

hamburgerHazirla()
kizartmaHazirla()
icecekHazirla()

const tepsiyeYerlestir = () => {
    hideById("btnTepsiKoy")
    showById("tepsiyeYerlestiriliyorYazisi")
    wait(1000)
        .then(() => {
            hideById("tepsiyeYerlestiriliyorYazisi")
            showById("btnMusteriServis")
            consumeOne("Paket Sos")
            paketSosAdetGoster()
        })
}
const musteriyeServisEt = () => {
    hideById("btnMusteriServis")
    showById("musteriyeServisEdiliyorYazisi")
    wait(1000).then(() => {
        alert("Menü müşteriye servis edildi.")
        document.body.innerHTML = originalHtml;
        butunMalzemeleriGoster()
        hamburgerHazirla()
        kizartmaHazirla()
        icecekHazirla()
        servisUrunu = JSON.parse(JSON.stringify(servisUrunuBaslagic))
    })
}