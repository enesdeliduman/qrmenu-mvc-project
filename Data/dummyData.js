const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const QRCode = require("qrcode");

// Şirket ve Menü şemalarını içe aktar
const Company = require('../Models/Company');  // Şirket şeması
const Menu = require('../Models/Menu');        // Menü şeması

// Dummy veri oluşturma
const createDummyData = async () => {
    const companies = [
        {
            name: 'Alpha Şirketi',
            emailAddress: 'alpha@example.com',
            password: await bcrypt.hash("root", 10),
            telephone: 1234567890,
            photo: 'https://i.pinimg.com/736x/2f/fb/dc/2ffbdcdf421e37ff00b84643913c9e18.jpg',
            qrcode: await QRCode.toString(process.env.SITE_URL + "/" + "alpha-sirketi", { type: 'svg', width: 150, height: 150 }),
            views: 150,
            address: { city: 'Alpha Şehri', district: 'Alpha İlçesi', neighborhood: 'Alpha Mahallesi' },
            isAdmin: true,
            isConfirm: true,
            resetPassword: { token: 'alphaResetToken', expired: new Date(Date.now() + 3600 * 1000) }
        },
        {
            name: 'Beta Şirketi',
            emailAddress: 'beta@example.com',
            password: await bcrypt.hash("root", 10),
            telephone: 2345678901,
            photo: 'https://static.vecteezy.com/system/resources/previews/004/909/732/non_2x/logo-cafe-free-vector.jpg',
            qrcode: await QRCode.toString(process.env.SITE_URL + "/" + "beta-sirketi", { type: 'svg', width: 150, height: 150 }),
            views: 200,
            address: { city: 'Beta Şehri', district: 'Beta İlçesi', neighborhood: 'Beta Mahallesi' },
            isAdmin: false,
            isConfirm: true,
            resetPassword: { token: 'betaResetToken', expired: new Date(Date.now() + 3600 * 1000) }
        },
        {
            name: 'Gamma Şirketi',
            emailAddress: 'gamma@example.com',
            password: await bcrypt.hash("root", 10),
            telephone: 3456789012,
            photo: 'https://img.freepik.com/premium-vector/creative-cafe-logo-design-isolated-with-coffee-bean_11980-612.jpg',
            qrcode: await QRCode.toString(process.env.SITE_URL + "/" + "gamma-sirketi", { type: 'svg', width: 150, height: 150 }),
            views: 250,
            address: { city: 'Gamma Şehri', district: 'Gamma İlçesi', neighborhood: 'Gamma Mahallesi' },
            isAdmin: false,
            isConfirm: false,
            resetPassword: { token: 'gammaResetToken', expired: new Date(Date.now() + 3600 * 1000) }
        }
    ];

    const categories = [
        {
            name: 'Başlangıçlar',
            description: 'Lezzetli ve hafif başlangıçlarla sofralarınızı renklendirin.',
            photo: "https://evdekilezzet.com/wp-content/uploads/2019/02/Ispanakli_Tava_Boregi_Tarifi-Evdeki_Lezzet-627x353.jpg",
            products: [
                {
                    name: 'Sigara Böreği',
                    description: 'Kızarmış yufka içinde peynir ve maydanoz. Çok lezzetli bir başlangıç!',
                    price: 15.00,
                    photo: 'https://cdn.yemek.com/mncrop/940/625/uploads/2024/01/sigara-boregi-yemekcom.jpg'
                },
                {
                    name: 'Cacık',
                    description: 'Yoğurt, salatalık ve nane ile hazırlanan serinletici bir meze. Hafif ve ferahlatıcı.',
                    price: 10.00,
                    photo: 'https://image.milimaj.com/i/milliyet/75/0x410/61e16e0486b24a15e8c0dfe0.jpg'
                },
                {
                    name: 'Fava',
                    description: 'Bezelye püresi, zeytinyağı ve baharatlarla yapılmış geleneksel bir başlangıç. Yoğun ve zengin bir tat.',
                    price: 12.00,
                    photo: 'https://cdn.yemek.com/mnresize/940/940/uploads/2014/08/fava-one-cikan-yeni.jpg'
                }
            ]
        },
        {
            name: 'Ana Yemekler',
            description: 'Zengin tatlar ve doyurucu ana yemeklerle ana öğününüzü tamamlayın.',
            photo: "https://i.ytimg.com/vi/41upHm1RPwM/hq720.jpg?sqp=-oaymwEXCK4FEIIDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBCQvaAwzziLWeMdusJJxa6WL2ISQ",
            products: [
                {
                    name: 'İskender Kebabı',
                    description: 'İskender kebabı, yoğurt ve domates sosu ile servis edilen döner et. Klasik ve doyurucu.',
                    price: 30.00,
                    photo: 'https://www.dergibursa.com.tr/wp-content/uploads/2015/08/iskender-kebap.jpg'
                },
                {
                    name: 'Kuzu Tandır',
                    description: 'Uzun saatler pişirilmiş kuzu eti, patates ve sebzelerle servis edilir. Nefis ve lezzetli.',
                    price: 40.00,
                    photo: 'https://i.ytimg.com/vi/IOGAjgwlQ6g/maxresdefault.jpg'
                },
                {
                    name: 'Mantarlı Tavuk',
                    description: 'Kremalı mantar sosuyla servis edilen tavuk göğsü. Hafif ve kremalı.',
                    price: 25.00,
                    photo: 'https://i.hakimiyet.com/c/60/1280x720/s/dosya/haber/lezzetli-ve-pratik-evde-mantar_1711790908_2lCsTy.jpg'
                }
            ]
        },
        {
            name: 'Tatlılar',
            description: 'Tatlı krizlerinizi giderecek enfes tatlı seçenekleri.',
            photo: "https://denizliyeniolay.com/1200/630/1/media/2023/08/Bagimlisi-Olacag-1691575760.jpg",
            products: [
                {
                    name: 'Baklava',
                    description: 'Pistachio ve şeker şerbeti ile hazırlanan geleneksel tatlı. Tatlı ve çıtır.',
                    price: 20.00,
                    photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqcXBktNsIimO0afpqZTFfKzsZaqzk-5FHsQ&s'
                },
                {
                    name: 'Sütlaç',
                    description: 'Süt ve pirinçten yapılan tatlı, üzerine tarçın ile servis edilir. Klasik ve hafif.',
                    price: 12.00,
                    photo: 'https://cdn.yemek.com/mnresize/1250/833/uploads/2019/05/sutlac-guncelleme-sunum-1.jpg'
                },
                {
                    name: 'Künefe',
                    description: 'Peynir ve şerbet ile yapılan ince hamur tatlısı. Tatlı ve çıtır.',
                    price: 18.00,
                    photo: 'https://cdn.yemek.com/mnresize/1250/833/uploads/2015/05/kunefe-reels-yemekcom-1.jpg'
                }
            ]
        }
    ];

    try {
        // Şirketleri topluca ekle
        const insertedCompanies = await Company.insertMany(companies);
        console.log('Şirketler topluca eklendi.');

        // Her şirket için menü verilerini topluca ekle
        const menus = insertedCompanies.map(company => ({
            company: company._id,
            categories: categories
        }));
        await Menu.insertMany(menus);
        console.log('Menüler topluca eklendi.');
    } catch (error) {
        console.error('Dummy veri ekleme hatası:', error);
    }
};

module.exports = createDummyData;
