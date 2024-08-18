const ErrorHandler = async (err, req, res, next) => {
    // console.error(err); // Hatanın detaylarını konsola yazdır
    console.error(err);
    // Hata bilgilerini saklayacak bir liste oluşturun
    let errors = [];

    // Hata kodları ve türleri için durumlara göre mesajları belirleyin
    if (err.name === 'ValidationError') {
        // Doğrulama hatası
        errors.push(...Object.values(err.errors).map(error => ` ${error.message}`));
    }
    else if (err.name === 'CastError') {
        // Veri türü hatası
        errors.push(`Geçersiz ${err.path}: ${err.value}`);
    }
    else if (err.code === 11000) {
        // Benzersizlik hatası
        const field = Object.keys(err.keyPattern)[0];
        const fieldNames = {
            emailAddress: 'e-posta adresi',
            telephone: 'telefon numarası'
        };
        const fieldName = fieldNames[field] || field;
        errors.push(`Bu ${fieldName} zaten kullanılıyor`);
    }
    else if (err.name === 'MongoServerError') {
        // MongoDB sunucu hatası
        errors.push('MongoDB sunucu hatası: ' + (err.message || 'Bilinmeyen hata'));
    }
    else {
        // Genel hata
        
        return res.send("500 INTERNAL SERVER")
    }

    // Hata listesini oturumda saklayın
    req.session.errors = errors;
    req.session.formData = req.body;

    // Hata sayfasına yönlendirin (orijinal URL)
    res.redirect(req.originalUrl);
};

module.exports = ErrorHandler;
