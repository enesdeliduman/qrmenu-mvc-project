const ErrorHandler = async (err, req, res, next) => {
    console.error(err);
    let errors = [];

    if (err.name === 'ValidationError') {
        errors.push(...Object.values(err.errors).map(error => ` ${error.message}`));
    }
    else if (err.name === 'CastError') {
        errors.push(`Geçersiz ${err.path}: ${err.value}`);
    }
    else if (err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];
        const fieldNames = {
            emailAddress: 'e-posta adresi',
            telephone: 'telefon numarası'
        };
        const fieldName = fieldNames[field] || field;
        errors.push(`Bu ${fieldName} zaten kullanılıyor`);
    }
    else if (err.name === 'MongoServerError') {
        errors.push('MongoDB sunucu hatası: ' + (err.message || 'Bilinmeyen hata'));
    }
    else {
        
        return res.send("500 INTERNAL SERVER")
    }

    req.session.errors = errors;
    req.session.formData = req.body;

    res.redirect(req.originalUrl);
};

module.exports = ErrorHandler;
