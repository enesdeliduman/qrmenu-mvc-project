const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt")

const AdminSchema = new Schema({
    emailAddress: {
        type: Schema.Types.String,
        required: true
    },
    password: {
        type: Schema.Types.String,
        required: true
    },
});

AdminSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};
const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin
