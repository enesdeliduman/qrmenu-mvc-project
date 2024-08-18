const mongoose = require("mongoose")

connectDB = () => {

    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
        .then(() => {
            console.log("Connect Database succesfull")
        })
        .catch(err => { console.log(err) })
};

module.exports = connectDB



