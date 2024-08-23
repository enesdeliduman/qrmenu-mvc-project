const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MenuSchema = new Schema({
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    categories: [
        {
            name: {
                type: String,
                required: [true, "Please enter the category name"]
            },
            photo: {
                type: String,
            },
            description: {
                type: String
            },
            products: [
                {
                    name: {
                        type: String,
                        required: [true, "Please enter the product name"]
                    },
                    description: {
                        type: String
                    },
                    price: {
                        type: Number,
                        required: [true, "Please enter the product price"],
                        min: [0, "Price cannot be negative"], // En az 0 olmalı
                        set: v => parseFloat(v.toFixed(2)) // İki ondalıklı basamağa yuvarlama

                    },
                    photo: {
                        type: String
                    },
                }
            ]
        }
    ],
    photos: {
        type: Array
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});


const Menu = mongoose.model("Menu", MenuSchema);
module.exports = Menu