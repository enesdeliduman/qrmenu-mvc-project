const metaTagCreator = function (title = "", description = "", image = "", url = "") {
    let keywords = []
    if (url == "/") {
        keywords = ["QR menü", "QR kod menü", "Dijital menü", "Çevrimiçi menü", "QR kod restoran menüsü", "Restoran QR kodu", "Dijital restoran menüsü", "QR menü uygulaması", "QR menü yazılımı", "QR kodlu yemek menüsü", "Restoran dijital menü", "Kafe QR menü", "Otel QR menü", "Fast food QR menü", "Cafe dijital menü", "Restoran menü çözümü", "Menü QR kodu oluşturma", "Çevrimiçi yemek siparişi", "QR kod jeneratörü", "Dijital menü yazılımı", "QR kod yönetimi", "Menü QR kod tasarımı", "QR menü platformu", "Mobil menü uygulaması", "QR kod ile sipariş", "Müşteri memnuniyeti artırma", "Hijyenik menü", "Kolay erişim menü", "Hızlı menü güncellemeleri", "Etkileşimli menü", "Menü özelleştirme", "QR menü reklamı", "QR menü fiyatları", "QR kod menü örnekleri", "QR kod menü tasarım hizmetleri", "QR menü entegrasyonu", "Menü QR kod güvenliği"]
    } else if (url == "auth/login") {
        keywords = ["Giriş yap", "Kullanıcı giriş", "Hesaba giriş", "Kullanıcı adı", "Şifre", "Giriş sayfası", "Giriş yapma", "Hesap erişimi", "Giriş bilgileri", "Giriş formu", "QR kod giriş", "QR kod ile giriş"]
    } else if (url == "auth/register") {
        keywords = ["Kayıt ol", "Kullanıcı kaydı", "Hesap oluştur", "Yeni kullanıcı", "Kayıt formu", "Kullanıcı adı oluşturma", "Şifre belirleme", "Kayıt sayfası", "Üye olma", "Kayıt işlemi", "Kayıt bilgileri", "QR kod kayıt", "QR kod ile kayıt"]
    }
    let metaTag = {
        title: title,
        description: description,
        image: `images/${image}`,
        url: process.env.SITE_URL + url,
        keywords: keywords
    }
    return metaTag
}

module.exports = metaTagCreator