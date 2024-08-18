const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const QRCode = require("qrcode");
const Menu = require("./Menu")
const slugfield = require('../helpers/slugfield');
var uniqueValidator = require('mongoose-unique-validator');


const CompanySchema = new Schema({
    name: {
        type: String,
        required: [true, "Lütfen şirketinizin ismini giriniz"],
        trim: true,
        minLength: [3, "Şirket ismi en az 3 kelime olmalıdır"],
        unique: false
    },
    emailAddress: {
        type: String,
        required: [true, "Lütfen e-posta adresinizi giriniz"],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Lütfen geçerli bir e-posta adresi giriniz"
        ],
        unique: [true, "Bu eposta adresi zaten kayıtlı"],
    },
    password: {
        type: String,
        required: [true, "Lütfen şifrenizi giriniz"],
        minLength: [4, "Şifrenizin uzunluğu en az 4 karakter olmalıdır"],
        select: false
    },
    telephone: {
        type: Number,
        unique: true
    },
    photo: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },
    qrcode: {
        type: String,
        unique: false
    },
    slugfield: {
        type: String,
    },
    socialMedia: {
        instagram: {
            type: String,
        },
        facebook: {
            type: String,
        },
        twitter: {
            type: String,
        },
        youtube: {
            type: String,
        },
    },
    views: {
        type: Number
    },
    address: {
        city: {
            type: String
        },
        district: {
            type: String
        },
        neighborhood: {
            type: String
        }
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isConfirm: {
        type: Boolean,
        default: false
    },
    confirmToken: {
        type: String,
        default: null
    },
    resetPassword: {
        token: {
            type: String,
            default: null
        },
        expired: {
            type: Date,
            default: null
        }
    },

});

CompanySchema.pre('save', async function (next) {
    if (this.isModified("password")) {
        try {
            const hashedPassword = await bcrypt.hash(this.password, 10);
            this.password = hashedPassword;
        } catch (err) {
            return next(err);
        }
    }
    if (this.isNew) {
        await Menu.create({
            company: this._id
        })
    }
    if (this.isModified("name") || this.isNew) {
        try {
            const baseSlug = slugfield(this.name);
            let newSlug = baseSlug;
            let slugExists = await this.constructor.findOne({ slugfield: newSlug });

            if (slugExists) {
                let suffix = 1;
                const regex = new RegExp(`^${baseSlug}-(\\d+)$`);
                const existingSlugs = await this.constructor.find({ slugfield: { $regex: regex } });
                if (existingSlugs.length > 0) {
                    const maxSuffix = existingSlugs.reduce((max, item) => {
                        const match = item.slugfield.match(regex);
                        return match ? Math.max(max, parseInt(match[1])) : max;
                    }, 0);
                    suffix = maxSuffix + 1;
                }
                newSlug = `${baseSlug}-${suffix}`;
            }
            this.slugfield = newSlug;
            const qrCodeData = await QRCode.toString(`${process.env.SITE_URL}/${this.slugfield}`, { type: 'svg', width: 150, height: 150 });
            this.qrcode = qrCodeData;

        } catch (err) {
            return next(err);
        }
    }
    if (this.isModified("telephone") || this.isNew) {
        try {
            this.telephone = "+90" + this.telephone;
        } catch (err) {
            return next(err);
        }
    }
    next();
});
CompanySchema.methods.regenerateQRCode = async function () {
    try {
        const qrCodeData = await QRCode.toString(this.slugfield, { type: 'svg', width: 150, height: 150 });
        this.qrcode = qrCodeData;
        await this.save();
    } catch (err) {
        throw new Error('QR kodunu yenilemek başarısız oldu');
    }
};
CompanySchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const Company = mongoose.model("Company", CompanySchema);
module.exports = Company