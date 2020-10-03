const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    location: {
        type: String
    },
    details: {
        type: String
    }
});

module.exports = mongoose.model('Company', CompanySchema);