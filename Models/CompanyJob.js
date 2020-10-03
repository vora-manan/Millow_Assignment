const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanyJobSchema = new Schema({
    company_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Company'
    },
    job: {
        type: String,
        required: true
    },
    job_details: {
        type: String,
        required: true
    }

});


module.exports = mongoose.model('CompanyJob', CompanyJobSchema);