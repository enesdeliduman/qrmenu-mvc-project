const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const QRCode = require("qrcode");

// Şirket ve Menü şemalarını içe aktar
const Company = require('../Models/Company');  // Şirket şeması
const Admin = require('../Models/Admin');  // Şirket şeması
const Menu = require('../Models/Menu');        // Menü şeması



// Dummy veri oluşturma
const createDummyData = async () => {
    // const admin = [
    //     {
    //         username: "root",
    //         password: await bcrypt.hash("root", 10)
    //     }
    // ]

    const companies = [
        {
            name: 'Alpha Şirketi',
            emailAddress: 'alpha@example.com',
            password: await bcrypt.hash("root", 10),
            telephone: 1234567890,
            photo: 'alpha-logo.jpg',
            slugfield: 'alpha-sirketi',
            qrcode: await QRCode.toString(process.env.SITE_URL + "/" + "menu/alpha-sirketi", { type: 'svg' }),
            views: 150,
            address: 'Alpha Şehri',
            isAdmin: true,
            isConfirm: true,
            resetPassword: { token: 'alphaResetToken', expired: new Date(Date.now() + 3600 * 1000) },
            socialMedia: { instagram: 'AlphaInstagram', facebook: 'AlphaFacebook', youtube: 'AlphaYoutube', twitter: 'AlphaTwitter' }
        },
        {
            name: 'Beta Şirketi',
            emailAddress: 'beta@example.com',
            password: await bcrypt.hash("root", 10),
            telephone: 2345678901,
            photo: 'beta-logo.jpg',
            slugfield: 'beta-sirketi',
            qrcode: await QRCode.toString(process.env.SITE_URL + "/menu/" + "beta-sirketi", { type: 'svg' }),
            views: 200,
            address: 'Beta Şehri',
            isAdmin: false,
            isConfirm: true,
            resetPassword: { token: 'betaResetToken', expired: new Date(Date.now() + 3600 * 1000) },
            socialMedia: { instagram: 'BetaInstagram', facebook: 'BetaFacebook', youtube: 'BetaYoutube', twitter: 'BetaTwitter' }
        },
        {
            name: 'Gamma Şirketi',
            emailAddress: 'gamma@example.com',
            password: await bcrypt.hash("root", 10),
            telephone: 3456789012,
            photo: 'gamma-logo.png',
            slugfield: 'gamma-sirketi',
            qrcode: await QRCode.toString(process.env.SITE_URL + "/" + "menu/gamma-sirketi", { type: 'svg' }),
            views: 250,
            address: 'Gamma Şehri',
            isAdmin: false,
            isConfirm: false,
            resetPassword: { token: 'gammaResetToken', expired: new Date(Date.now() + 3600 * 1000) },
            socialMedia: { instagram: 'GammaInstagram', facebook: 'GammaFacebook', youtube: 'GammaYoutube', twitter: 'GammaTwitter' }
        }
    ];

    const categories = [
        {
            name: 'Başlangıçlar',
            description: 'Lezzetli ve hafif başlangıçlarla sofralarınızı renklendirin.',
            photo: "baslangiclar.jpg",
            products: [
                {
                    name: 'Sigara Böreği',
                    description: 'Kızarmış yufka içinde peynir ve maydanoz. Çok lezzetli bir başlangıç!',
                    price: 15.00,
                    photo: 'sigara-boregi.jpg'
                },
                {
                    name: 'Cacık',
                    description: 'Yoğurt, salatalık ve nane ile hazırlanan serinletici bir meze. Hafif ve ferahlatıcı.',
                    price: 10.00,
                    photo: 'cacik.jpg'
                },
                {
                    name: 'Fava',
                    description: 'Bezelye püresi, zeytinyağı ve baharatlarla yapılmış geleneksel bir başlangıç. Yoğun ve zengin bir tat.',
                    price: 12.00,
                    photo: 'fava.jpg'
                }
            ]
        },
        {
            name: 'Ana Yemekler',
            description: 'Zengin tatlar ve doyurucu ana yemeklerle ana öğününüzü tamamlayın.',
            photo: "ana-yemekler.jpg",
            products: [
                {
                    name: 'İskender Kebabı',
                    description: 'İskender kebabı, yoğurt ve domates sosu ile servis edilen döner et. Klasik ve doyurucu.',
                    price: 30.00,
                    photo: 'iskender-kebabi.jpg'
                },
                {
                    name: 'Kuzu Tandır',
                    description: 'Uzun saatler pişirilmiş kuzu eti, patates ve sebzelerle servis edilir. Nefis ve lezzetli.',
                    price: 40.00,
                    photo: 'kuzu-tandir.jpg'
                },
                {
                    name: 'Mantarlı Tavuk',
                    description: 'Kremalı mantar sosuyla servis edilen tavuk göğsü. Hafif ve kremalı.',
                    price: 25.00,
                    photo: 'mantarli-tavuk.jpg'
                }
            ]
        },
        {
            name: 'Tatlılar',
            description: 'Tatlı krizlerinizi giderecek enfes tatlı seçenekleri.',
            photo: "tatlilar.jpg",
            products: [
                {
                    name: 'Baklava',
                    description: 'Pistachio ve şeker şerbeti ile hazırlanan geleneksel tatlı. Tatlı ve çıtır.',
                    price: 20.00,
                    photo: 'baklava.jpg'
                },
                {
                    name: 'Sütlaç',
                    description: 'Süt ve pirinçten yapılan tatlı, üzerine tarçın ile servis edilir. Klasik ve hafif.',
                    price: 12.00,
                    photo: 'sutlac.jpg'
                },
                {
                    name: 'Künefe',
                    description: 'Peynir ve şerbet ile yapılan ince hamur tatlısı. Tatlı ve çıtır.',
                    price: 18.00,
                    photo: 'kunefe.jpg'
                }
            ]
        }
    ];

    const photos = [
        'baslangiclar.jpg',
        'tatlilar.jpg',
        'baklava.jpg',
        'cacik.jpg',
        'fava.jpg',
        'kunefe.jpg',
        'sutlac.jpg',
        'kuzu-tandir.jpg',
        'mantarli-tavuk.jpg',
        'iskender-kebabi.jpg',
        'ana-yemekler.jpg',
        'sigara-boregi.jpg',
    ]

    try {
        // Şirketleri topluca ekle
        const insertedCompanies = await Company.insertMany(companies);
        console.log('Şirketler topluca eklendi.');
        
        await Admin.insertMany([{ emailAddress: "root@root.com", password: await bcrypt.hash("root", 10) }])
        console.log('Admin eklendi.');
        

        // Her şirket için menü verilerini topluca ekle
        const menus = insertedCompanies.map(company => ({
            company: company._id,
            categories: categories,
            photos: photos
        }));
        await Menu.insertMany(menus);
        console.log('Menüler topluca eklendi.');
    } catch (error) {
        console.error('Dummy veri ekleme hatası:', error);
    }
};

module.exports = createDummyData;
